import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { site } from '@/lib/site';
import type { SubmissionType } from '@/lib/schemas';

export interface Submission {
  type: SubmissionType;
  /** Short human-readable summary used as the email subject. */
  summary: string;
  name?: string;
  email?: string;
  phone?: string;
  payload: Record<string, unknown>;
}

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  LEAD_NOTIFICATION_EMAIL,
  LEAD_FROM_EMAIL,
} = process.env;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function renderEmail(submission: Submission) {
  const rows = Object.entries(submission.payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#8A8A8A;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(
            key
          )}</td>
          <td style="padding:6px 0;color:#1C1C1C;font-size:14px">${escapeHtml(
            typeof value === 'object' ? JSON.stringify(value, null, 2) : value
          ).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px">
      <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C9A96E;margin:0 0 4px">
        ${escapeHtml(site.name)}
      </p>
      <h1 style="font-size:20px;color:#1C1C1C;margin:0 0 20px">${escapeHtml(
        submission.summary
      )}</h1>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
      <p style="margin-top:24px;font-size:12px;color:#8A8A8A">
        Submitted ${new Date().toUTCString()}
      </p>
    </div>`;
}

/**
 * Persists a submission and notifies the team.
 *
 * The database write and the email are independent: a failure in one must not
 * swallow the other, or a lead disappears silently. We throw only if *every*
 * configured channel failed, so the customer sees an error exactly when
 * nobody received their request.
 */
export async function recordSubmission(submission: Submission): Promise<void> {
  const attempted: string[] = [];
  const failures: string[] = [];

  if (supabase) {
    attempted.push('database');
    const { error } = await supabase.from('submissions').insert({
      type: submission.type,
      name: submission.name ?? null,
      email: submission.email ?? null,
      phone: submission.phone ?? null,
      payload: submission.payload,
    });
    if (error) {
      failures.push('database');
      console.error('[submissions] Supabase insert failed:', error.message);
    }
  }

  if (resend) {
    attempted.push('email');
    try {
      const { error } = await resend.emails.send({
        from: LEAD_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
        to: LEAD_NOTIFICATION_EMAIL ?? site.email,
        replyTo: submission.email,
        subject: `${submission.summary} — ${site.name}`,
        html: renderEmail(submission),
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      failures.push('email');
      console.error('[submissions] Resend send failed:', error);
    }
  }

  if (attempted.length === 0) {
    // No channel configured at all — loud in dev, and a hard failure in
    // production so a misconfigured deploy never silently eats leads.
    console.warn(
      `[submissions] No delivery channel configured. Dropping ${submission.type}:`,
      submission.payload
    );
    if (process.env.NODE_ENV === 'production') {
      throw new Error('No submission delivery channel is configured');
    }
    return;
  }

  if (failures.length === attempted.length) {
    throw new Error(`All delivery channels failed: ${failures.join(', ')}`);
  }
}

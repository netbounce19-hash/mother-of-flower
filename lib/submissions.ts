import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { site } from '@/lib/site';
import type { SubmissionType } from '@/lib/schemas';
import { customerEmail, teamEmail, toPlainText } from '@/lib/emails';

export interface Submission {
  type: SubmissionType;
  /** Short human-readable summary used as the email subject. */
  summary: string;
  name?: string;
  email?: string;
  phone?: string;
  payload: Record<string, unknown>;
  /** Payload keys safe to echo back to the customer. */
  customerSummaryKeys?: string[];
}

/**
 * Environment values pasted through a dashboard routinely arrive wrapped in
 * the quotes that a .env file needs for values containing spaces, e.g.
 * `"Mother of Flower <orders@…>"`. Resend then rejects the address as
 * malformed. Strip surrounding quotes and stray whitespace rather than making
 * the deploy depend on someone noticing.
 */
function cleanEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().replace(/^["']|["']$/g, '').trim();
  return trimmed || undefined;
}

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  LEAD_NOTIFICATION_EMAIL,
  LEAD_FROM_EMAIL,
  LEAD_REPLY_TO,
} = process.env;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/** Where studio notifications land. */
const TEAM_INBOX = cleanEnv(LEAD_NOTIFICATION_EMAIL) ?? site.email;
/** Must be an address on a domain verified in Resend. */
const FROM = cleanEnv(LEAD_FROM_EMAIL) ?? `${site.name} <onboarding@resend.dev>`;
/** Where a customer's reply to the confirmation goes. */
const REPLY_TO = cleanEnv(LEAD_REPLY_TO) ?? site.email;

const SUBJECTS: Record<SubmissionType, string> = {
  order: `Your order — ${site.name}`,
  call_request: `We'll call you back — ${site.name}`,
  custom_request: `Your bespoke request — ${site.name}`,
  partnership: `Your partnership enquiry — ${site.name}`,
  drop_hint: `Your hint is on its way — ${site.name}`,
};

/**
 * Persists a submission and sends the two emails it generates.
 *
 * The channels are independent on purpose. The studio notification is the one
 * that must not be lost, so:
 *   - a database failure never blocks the email, and vice versa;
 *   - the customer confirmation is best-effort — failing to reassure someone
 *     is not a reason to tell them their order did not go through;
 *   - we only throw when nothing at all reached the studio.
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
      const html = teamEmail({
        summary: submission.summary,
        type: submission.type,
        payload: submission.payload,
        replyTo: submission.email,
        phone: submission.phone,
      });

      const { error } = await resend.emails.send({
        from: FROM,
        to: TEAM_INBOX,
        // Replying in the inbox answers the customer directly.
        replyTo: submission.email ?? REPLY_TO,
        subject: `${submission.summary} — ${site.name}`,
        html,
        text: toPlainText(html),
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      failures.push('email');
      console.error(
        `[submissions] studio notification failed (from=${JSON.stringify(FROM)} to=${JSON.stringify(TEAM_INBOX)}):`,
        error
      );
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

  // Best-effort, and deliberately after the throw check above: the customer is
  // told their request went through only once the studio actually has it.
  await sendCustomerConfirmation(submission);
}

async function sendCustomerConfirmation(submission: Submission): Promise<void> {
  if (!resend || !submission.email) return;

  try {
    const html = customerEmail({
      type: submission.type,
      name: submission.name,
      payload: submission.payload,
      summaryKeys: submission.customerSummaryKeys,
    });

    const { error } = await resend.emails.send({
      from: FROM,
      to: submission.email,
      replyTo: REPLY_TO,
      subject: SUBJECTS[submission.type],
      html,
      text: toPlainText(html),
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    // Never surfaced to the customer: the studio already has the request.
    console.error(
      `[submissions] customer confirmation failed (from=${JSON.stringify(FROM)} to=${JSON.stringify(submission.email)}):`,
      error
    );
  }
}

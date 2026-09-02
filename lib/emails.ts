import 'server-only';

import { site } from '@/lib/site';
import type { SubmissionType } from '@/lib/schemas';

export const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const BRAND = {
  ink: '#1C1C1C',
  muted: '#6B6B6B',
  line: '#E5E2DB',
  gold: '#8A6A2E',
  paper: '#FDFDFD',
  surface: '#FAF8F4',
};

/** Wraps content in the shared brand shell used by both emails. */
function shell(opts: { preheader: string; eyebrow: string; heading: string; body: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${escapeHtml(opts.heading)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.surface};">
  <span style="display:none;font-size:1px;color:${BRAND.surface};max-height:0;overflow:hidden">${escapeHtml(opts.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:${BRAND.paper};border:1px solid ${BRAND.line};border-radius:4px">
        <tr><td style="padding:36px 36px 28px">
          <p style="margin:0 0 6px;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${BRAND.gold}">
            ${escapeHtml(opts.eyebrow)}
          </p>
          <h1 style="margin:0 0 22px;font:400 24px/1.25 Georgia,'Times New Roman',serif;color:${BRAND.ink}">
            ${escapeHtml(opts.heading)}
          </h1>
          ${opts.body}
        </td></tr>
        <tr><td style="padding:20px 36px 32px;border-top:1px solid ${BRAND.line}">
          <p style="margin:0 0 4px;font:400 13px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.muted}">
            ${escapeHtml(site.name)} · ${escapeHtml(site.address.full)}
          </p>
          <p style="margin:0;font:400 13px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.muted}">
            <a href="${site.phone.href}" style="color:${BRAND.ink};text-decoration:none">${escapeHtml(site.phone.display)}</a>
            &nbsp;·&nbsp;
            <a href="mailto:${site.email}" style="color:${BRAND.ink};text-decoration:none">${escapeHtml(site.email)}</a>
            &nbsp;·&nbsp; ${escapeHtml(site.hours.short)}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function detailRows(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding:8px 18px 8px 0;font:400 13px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.muted};vertical-align:top;white-space:nowrap">${escapeHtml(key)}</td>
        <td style="padding:8px 0;font:400 14px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.ink}">${escapeHtml(
          typeof value === 'object' ? JSON.stringify(value, null, 2) : value
        ).replace(/\n/g, '<br>')}</td>
      </tr>`
    )
    .join('');
}

/** Internal notification — everything the studio needs to act on. */
export function teamEmail(input: {
  summary: string;
  type: SubmissionType;
  payload: Record<string, unknown>;
  replyTo?: string;
  phone?: string;
}) {
  const actions: string[] = [];
  if (input.phone) {
    actions.push(
      `<a href="tel:${escapeHtml(input.phone)}" style="display:inline-block;padding:12px 22px;background:${BRAND.ink};color:${BRAND.paper};font:700 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px">Call ${escapeHtml(input.phone)}</a>`
    );
  }
  if (input.replyTo) {
    actions.push(
      `<a href="mailto:${escapeHtml(input.replyTo)}" style="display:inline-block;padding:12px 22px;border:1px solid ${BRAND.ink};color:${BRAND.ink};font:700 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:2px">Reply by email</a>`
    );
  }

  return shell({
    preheader: input.summary,
    eyebrow: LABELS[input.type].eyebrow,
    heading: input.summary,
    body: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(input.payload)}</table>
      ${actions.length ? `<div style="margin-top:26px">${actions.join('&nbsp;&nbsp;')}</div>` : ''}
      <p style="margin:26px 0 0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.muted}">
        Received ${new Date().toUTCString()}. Reply to this message to answer the customer directly.
      </p>`,
  });
}

const LABELS: Record<SubmissionType, { eyebrow: string; heading: string; lead: string }> = {
  order: {
    eyebrow: 'Order received',
    heading: 'Thank you for your order',
    lead: 'We have your order and will call you shortly to confirm availability, the delivery window and how you would like to pay. No payment has been taken.',
  },
  call_request: {
    eyebrow: 'Call requested',
    heading: 'We will call you back',
    lead: 'Thank you for getting in touch. One of our florists will call you back during opening hours.',
  },
  custom_request: {
    eyebrow: 'Request received',
    heading: 'Your bespoke request',
    lead: 'Thank you — we have your brief. One of our florists will be in touch within one business day to talk through the design, the blooms in season and the budget.',
  },
  partnership: {
    eyebrow: 'Enquiry received',
    heading: 'Thank you for your interest',
    lead: 'We have your partnership enquiry and will come back to you within one business day to discuss terms and how we can support your venue.',
  },
  drop_hint: {
    eyebrow: 'Hint sent',
    heading: 'Your hint is on its way',
    lead: 'Thank you — we have noted the bouquet you liked. Fingers crossed the hint lands.',
  },
};

/** Customer-facing confirmation. Never contains internal notes or pricing edits. */
export function customerEmail(input: {
  type: SubmissionType;
  name?: string;
  payload: Record<string, unknown>;
  /** Which payload keys are safe and useful to echo back. */
  summaryKeys?: string[];
}) {
  const copy = LABELS[input.type];
  const greeting = input.name ? `Hello ${escapeHtml(input.name.split(' ')[0])},` : 'Hello,';

  const echoed = (input.summaryKeys ?? [])
    .filter((k) => input.payload[k] !== undefined && input.payload[k] !== '')
    .map((k) => [k, input.payload[k]] as const);

  const summaryTable = echoed.length
    ? `<div style="margin:24px 0;padding:20px;background:${BRAND.surface};border:1px solid ${BRAND.line};border-radius:3px">
         <p style="margin:0 0 12px;font:700 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted}">Summary</p>
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(
           Object.fromEntries(echoed)
         )}</table>
       </div>`
    : '';

  return shell({
    preheader: copy.lead.slice(0, 120),
    eyebrow: copy.eyebrow,
    heading: copy.heading,
    body: `
      <p style="margin:0 0 14px;font:400 15px/1.75 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.ink}">${greeting}</p>
      <p style="margin:0 0 14px;font:400 15px/1.75 -apple-system,Segoe UI,Roboto,sans-serif;color:#444444">${escapeHtml(copy.lead)}</p>
      ${summaryTable}
      <p style="margin:0 0 8px;font:400 14px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;color:#444444">
        Need to change something? Just reply to this email or call
        <a href="${site.phone.href}" style="color:${BRAND.ink}">${escapeHtml(site.phone.display)}</a>.
      </p>
      <p style="margin:20px 0 0;font:400 13px/1.7 -apple-system,Segoe UI,Roboto,sans-serif;color:${BRAND.muted}">
        This is a confirmation of a request you made at
        <a href="${site.url}" style="color:${BRAND.ink}">${escapeHtml(site.url.replace('https://', ''))}</a>.
      </p>`,
  });
}

/** Plain-text fallback, so the message is not filed as spam-shaped HTML-only. */
export function toPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|tr|h1|div)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
}

/**
 * Renders both emails to /tmp for eyeballing, and optionally sends a real pair
 * through Resend so you can confirm deliverability before going live.
 *
 *   node --experimental-strip-types scripts/check-email.mjs            # render only
 *   node --experimental-strip-types scripts/check-email.mjs you@you.com # render + send
 *
 * Reads .env.local the same way Next does.
 */
import fs from 'node:fs';
import path from 'node:path';

// Minimal .env.local loader — this script runs outside the Next runtime.
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    process.env[m[1]] ??= v;
  }
}

const { customerEmail, teamEmail, toPlainText } = await import(
  path.join(process.cwd(), 'lib/emails.ts')
);

const sample = {
  type: 'order',
  summary: 'New order — $350.13',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+17252242454',
  payload: {
    Customer: 'Jane Doe',
    'Customer phone': '+1 (725) 224-2454',
    'Customer email': 'jane@example.com',
    Recipient: 'Anna Smith',
    'Recipient phone': '+1 (702) 555-0147',
    Method: 'delivery',
    Address: '123 Fremont St, Las Vegas NV 89101',
    'Card message': 'Happy birthday!',
    Items: '1× Red Obsession (Classic, Warm White) — $150.00 — Tue, Sep 1, 10:00 AM – 12:00 PM',
    Subtotal: '$150.00',
    Shipping: '$25.00',
    Tax: '$12.56',
    Total: '$187.56',
  },
};

const team = teamEmail({
  summary: sample.summary,
  type: sample.type,
  payload: sample.payload,
  replyTo: sample.email,
  phone: sample.phone,
});
const customer = customerEmail({
  type: sample.type,
  name: sample.name,
  payload: sample.payload,
  summaryKeys: ['Items', 'Address', 'Subtotal', 'Shipping', 'Tax', 'Total'],
});

fs.writeFileSync('/tmp/email-team.html', team);
fs.writeFileSync('/tmp/email-customer.html', customer);
console.log('rendered → /tmp/email-team.html, /tmp/email-customer.html');
console.log('\n--- customer, plain text ---\n' + toPlainText(customer));

console.log('\n--- configuration ---');
const cfg = {
  RESEND_API_KEY: process.env.RESEND_API_KEY ? 're_…' + process.env.RESEND_API_KEY.slice(-4) : '(missing)',
  LEAD_NOTIFICATION_EMAIL: process.env.LEAD_NOTIFICATION_EMAIL ?? '(default: info@motherofflower.com)',
  LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL ?? '(default: onboarding@resend.dev)',
  LEAD_REPLY_TO: process.env.LEAD_REPLY_TO ?? '(default: info@motherofflower.com)',
  SUPABASE_URL: process.env.SUPABASE_URL ? 'set' : '(not set — email only)',
};
for (const [k, v] of Object.entries(cfg)) console.log(`  ${k.padEnd(24)} ${v}`);

const target = process.argv[2];
if (!target) {
  console.log('\nPass an address to send a live test: node --experimental-strip-types scripts/check-email.mjs you@example.com');
  process.exit(0);
}

if (!process.env.RESEND_API_KEY) {
  console.error('\nRESEND_API_KEY is not set — cannot send. Add it to .env.local first.');
  process.exit(1);
}

const { Resend } = await import('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.LEAD_FROM_EMAIL ?? 'Mother of Flower <onboarding@resend.dev>';

for (const [label, html, subject] of [
  ['studio notification', team, '[TEST] New order — $187.56 — Mother of Flower'],
  ['customer confirmation', customer, '[TEST] Your order — Mother of Flower'],
]) {
  const { data, error } = await resend.emails.send({
    from,
    to: target,
    subject,
    html,
    text: toPlainText(html),
  });
  console.log(error ? `  ✗ ${label}: ${error.message}` : `  ✓ ${label} sent (id ${data.id})`);
}

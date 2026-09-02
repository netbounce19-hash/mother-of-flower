// Sandbox smoke test for the payment path.
//
// Square's Sandbox accepts the fixed source id `cnon:card-nonce-ok` in place of
// a real card token, which lets the server code be exercised without driving
// the browser's card iframe. Run with:
//
//   npm run square:check
//
// It charges a test card in the Sandbox only — no real money can move, because
// the Sandbox is an isolated environment with its own credentials.
import { readFileSync } from 'node:fs';

// The scripts run outside Next, which is what loads .env.local normally.
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (match && !process.env[match[1]]) {
    process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  }
}

const { chargeCard, isSquareConfigured, squareEnvironmentName } = await import('@/lib/square');

if (!isSquareConfigured) {
  console.error('Square is not configured — check SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID.');
  process.exit(1);
}
if (squareEnvironmentName !== 'sandbox') {
  console.error('Refusing to run: this would charge a real card. Set SQUARE_ENVIRONMENT=sandbox.');
  process.exit(1);
}

// The total a real checkout produces for one Red Obsession with delivery:
// $150 + $25 delivery + 8.375% tax. Kept literal because the pricing module
// pulls in the product data, whose type-only imports plain node cannot strip.
const totals = { total: 187.56 };

console.log(`Charging $${totals.total.toFixed(2)} in the ${squareEnvironmentName} environment…`);

// Pass a different Sandbox nonce to exercise a failure, e.g.
//   npm run square:check cnon:card-nonce-declined
const sourceId = process.argv[2] ?? 'cnon:card-nonce-ok';

const result = await chargeCard({
  sourceId,
  amount: totals.total,
  idempotencyKey: crypto.randomUUID(),
  buyerEmail: process.env.LEAD_NOTIFICATION_EMAIL,
  note: 'Sandbox smoke test',
});

console.log({
  sourceId,
  paymentId: result.paymentId,
  status: result.status,
  card: `${result.cardBrand} ••${result.last4}`,
  amount: `$${result.amount.toFixed(2)}`,
  receipt: result.receiptUrl,
});

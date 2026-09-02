import 'server-only';

import { SquareClient, SquareEnvironment } from 'square';
import { randomUUID } from 'node:crypto';

const {
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  SQUARE_ENVIRONMENT,
} = process.env;

const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, '').trim() || undefined;

const token = clean(SQUARE_ACCESS_TOKEN);
const locationId = clean(SQUARE_LOCATION_ID);
const environment =
  clean(SQUARE_ENVIRONMENT) === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

const client = token ? new SquareClient({ token, environment }) : null;

/** True when payments are configured; the checkout hides the card form otherwise. */
export const isSquareConfigured = Boolean(client && locationId);

export const squareEnvironmentName =
  environment === SquareEnvironment.Production ? 'production' : 'sandbox';

export interface ChargeInput {
  /** Single-use token produced by the Web Payments SDK in the browser. */
  sourceId: string;
  /** Amount in dollars, always recomputed on the server. */
  amount: number;
  /** Stable per checkout attempt, so a retry cannot charge twice. */
  idempotencyKey: string;
  buyerEmail?: string;
  note?: string;
  /** Square's own verification token from the 3-D Secure / SCA step. */
  verificationToken?: string;
}

export interface ChargeResult {
  paymentId: string;
  status: string;
  receiptUrl?: string;
  last4?: string;
  cardBrand?: string;
  amount: number;
}

export class PaymentError extends Error {
  /** Safe to show the customer. */
  readonly customerMessage: string;
  constructor(customerMessage: string, technical?: string) {
    super(technical ?? customerMessage);
    this.customerMessage = customerMessage;
  }
}

/** Square works in the smallest currency unit. */
const toCents = (dollars: number) => BigInt(Math.round(dollars * 100));

/**
 * Charges a card token.
 *
 * The amount comes from the server-side re-pricing, never from the browser —
 * the client only ever supplies an opaque one-use token. `autocomplete: true`
 * captures immediately, which is the model the studio chose.
 */
export async function chargeCard(input: ChargeInput): Promise<ChargeResult> {
  if (!client || !locationId) {
    throw new PaymentError(
      'Card payments are not available right now. Please call us and we will take your order by phone.',
      'Square is not configured'
    );
  }

  try {
    const response = await client.payments.create({
      sourceId: input.sourceId,
      idempotencyKey: input.idempotencyKey,
      locationId,
      autocomplete: true,
      amountMoney: { amount: toCents(input.amount), currency: 'USD' },
      buyerEmailAddress: input.buyerEmail,
      note: input.note?.slice(0, 500),
      verificationToken: input.verificationToken,
    });

    const payment = response.payment;
    if (!payment?.id) {
      throw new PaymentError('The payment could not be completed. Please try another card.');
    }

    return {
      paymentId: payment.id,
      status: payment.status ?? 'UNKNOWN',
      receiptUrl: payment.receiptUrl,
      last4: payment.cardDetails?.card?.last4,
      cardBrand: payment.cardDetails?.card?.cardBrand,
      amount: input.amount,
    };
  } catch (error) {
    if (error instanceof PaymentError) throw error;

    // Square returns an array of errors; the first one is the actionable one.
    const errors = (error as { errors?: { code?: string; detail?: string }[] })?.errors;
    const code = errors?.[0]?.code;
    console.error('[square] payment failed:', code, errors?.[0]?.detail ?? error);

    throw new PaymentError(customerMessageFor(code), `${code ?? 'unknown'}: ${errors?.[0]?.detail ?? String(error)}`);
  }
}

/** Square's error codes translated into something a buyer can act on. */
function customerMessageFor(code?: string): string {
  switch (code) {
    case 'CARD_DECLINED':
    case 'GENERIC_DECLINE':
      return 'Your card was declined. Please try another card or contact your bank.';
    case 'INSUFFICIENT_FUNDS':
      return 'The card has insufficient funds for this order.';
    case 'CVV_FAILURE':
      return 'The security code did not match. Please check the CVV and try again.';
    case 'ADDRESS_VERIFICATION_FAILURE':
      return 'The billing postcode did not match your card. Please check and try again.';
    case 'INVALID_EXPIRATION':
    case 'EXPIRATION_FAILURE':
      return 'The expiry date is not valid. Please check the card and try again.';
    case 'CARD_EXPIRED':
      return 'That card has expired. Please use another card.';
    case 'PAN_FAILURE':
      return 'The card number is not valid. Please check it and try again.';
    case 'CARD_DECLINED_VERIFICATION_REQUIRED':
      return 'Your bank needs to verify this payment. Please try again or use another card.';
    default:
      return 'We could not take the payment. Please try another card, or call us and we will take your order by phone.';
  }
}

export const newIdempotencyKey = () => randomUUID();

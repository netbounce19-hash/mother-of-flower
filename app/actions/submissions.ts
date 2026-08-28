'use server';

import { z } from 'zod';
import {
  callRequestSchema,
  customRequestSchema,
  dropHintSchema,
  orderSchema,
  partnershipSchema,
} from '@/lib/schemas';
import { recordSubmission } from '@/lib/submissions';
import { formatUSD, priceOrder } from '@/lib/pricing';
import type { FormState } from '@/lib/form-state';

const GENERIC_ERROR =
  'Something went wrong on our side. Please call us and we will take it from there.';

/**
 * Shared plumbing: validate, drop bots, deliver.
 *
 * `run` receives already-validated data and returns what should be recorded.
 */
async function handle<S extends z.ZodType>(
  schema: S,
  raw: unknown,
  run: (data: z.infer<S>) => Parameters<typeof recordSubmission>[0]
): Promise<FormState> {
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
    };
  }

  // Honeypot tripped: pretend it worked so the bot moves on.
  if ((parsed.data as { company?: string }).company) {
    return { status: 'success', message: 'Thank you!' };
  }

  try {
    await recordSubmission(run(parsed.data));
  } catch (error) {
    console.error('[actions] submission failed:', error);
    return { status: 'error', message: GENERIC_ERROR };
  }

  return { status: 'success' };
}

export async function submitCallRequest(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  return handle(
    callRequestSchema,
    {
      name: formData.get('name'),
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp') === 'on',
      telegram: formData.get('telegram') === 'on',
      company: formData.get('company') ?? '',
    },
    (data) => {
      const messengers = [
        data.whatsapp && 'WhatsApp',
        data.telegram && 'Telegram',
      ].filter(Boolean);
      return {
        type: 'call_request',
        summary: `Call request from ${data.name}`,
        name: data.name,
        phone: data.phone,
        payload: {
          Name: data.name,
          Phone: data.phone,
          'Preferred messenger': messengers.join(', ') || '—',
        },
      };
    }
  );
}

export async function submitCustomRequest(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  return handle(
    customRequestSchema,
    {
      name: formData.get('name'),
      contact: formData.get('contact'),
      inquiryType: formData.get('inquiryType') ?? '',
      eventDate: formData.get('eventDate') ?? '',
      budget: formData.get('budget') ?? '',
      details: formData.get('details') ?? '',
      company: formData.get('company') ?? '',
    },
    (data) => ({
      type: 'custom_request',
      summary: `Custom request from ${data.name}`,
      name: data.name,
      email: data.contact.includes('@') ? data.contact : undefined,
      phone: data.contact.includes('@') ? undefined : data.contact,
      payload: {
        Name: data.name,
        Contact: data.contact,
        'Inquiry type': data.inquiryType,
        'Event date': data.eventDate,
        Budget: data.budget,
        Details: data.details,
      },
    })
  );
}

export async function submitPartnership(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  return handle(
    partnershipSchema,
    {
      companyName: formData.get('companyName'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      details: formData.get('details') ?? '',
      company: formData.get('company') ?? '',
    },
    (data) => ({
      type: 'partnership',
      summary: `Partnership enquiry — ${data.companyName}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      payload: {
        Company: data.companyName,
        'Contact person': data.name,
        Phone: data.phone,
        Email: data.email,
        Details: data.details,
      },
    })
  );
}

export async function submitDropHint(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  return handle(
    dropHintSchema,
    {
      productName: formData.get('productName') ?? '',
      recipientFirstName: formData.get('recipientFirstName'),
      recipientEmail: formData.get('recipientEmail'),
      senderFirstName: formData.get('senderFirstName'),
      senderEmail: formData.get('senderEmail'),
      company: formData.get('company') ?? '',
    },
    (data) => ({
      type: 'drop_hint',
      summary: `Hint sent for ${data.productName || 'a bouquet'}`,
      name: data.senderFirstName,
      email: data.senderEmail,
      payload: {
        Product: data.productName,
        'Recipient name': data.recipientFirstName,
        'Recipient email': data.recipientEmail,
        'Sender name': data.senderFirstName,
        'Sender email': data.senderEmail,
      },
    })
  );
}

export async function submitOrder(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  let items: unknown = [];
  try {
    items = JSON.parse(String(formData.get('items') ?? '[]'));
  } catch {
    return { status: 'error', message: GENERIC_ERROR };
  }

  return handle(
    orderSchema,
    {
      recipientName: formData.get('recipientName'),
      recipientPhone: formData.get('recipientPhone'),
      shippingMethod: formData.get('shippingMethod'),
      address: formData.get('address') ?? '',
      cardMessage: formData.get('cardMessage') ?? '',
      items,
      company: formData.get('company') ?? '',
    },
    (data) => {
      // Never trust prices from the browser — recompute from product data.
      const totals = priceOrder(data.items, data.shippingMethod);
      return {
        type: 'order',
        summary: `New order — ${formatUSD(totals.total)}`,
        name: data.recipientName,
        phone: data.recipientPhone,
        payload: {
          Recipient: data.recipientName,
          Phone: data.recipientPhone,
          Method: data.shippingMethod,
          Address: data.address,
          'Card message': data.cardMessage,
          Items: totals.items
            .map(
              (i) =>
                `${i.quantity}× ${i.name} (${i.size}, ${i.boxColor}) — ${formatUSD(i.lineTotal)}`
            )
            .join('\n'),
          Subtotal: formatUSD(totals.subtotal),
          Shipping: formatUSD(totals.shipping),
          Tax: formatUSD(totals.tax),
          Total: formatUSD(totals.total),
        },
      };
    }
  );
}

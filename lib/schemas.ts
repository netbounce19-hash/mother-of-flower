import { z } from 'zod';

/** Every submission type the site can produce. */
export const SUBMISSION_TYPES = [
  'order',
  'call_request',
  'custom_request',
  'partnership',
  'drop_hint',
] as const;

export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

const name = z.string().trim().min(2, 'Please enter a name').max(120);
const email = z.email('Please enter a valid email address').max(200);
const phone = z
  .string()
  .trim()
  .min(7, 'Please enter a valid phone number')
  .max(40);
const optionalText = z.string().trim().max(2000).optional().or(z.literal(''));

/**
 * Bots fill in every field they can see. A field hidden from humans that
 * comes back populated is a bot — we accept the request and drop it.
 */
export const honeypot = z.literal('').optional();

export const callRequestSchema = z.object({
  name,
  phone,
  whatsapp: z.coerce.boolean().optional(),
  telegram: z.coerce.boolean().optional(),
  company: honeypot,
});

export const customRequestSchema = z.object({
  name,
  contact: z.string().trim().min(5, 'Please enter a phone number or email').max(200),
  inquiryType: z.string().trim().max(80).optional().or(z.literal('')),
  eventDate: z.string().trim().max(40).optional().or(z.literal('')),
  budget: z.string().trim().max(40).optional().or(z.literal('')),
  details: optionalText,
  company: honeypot,
});

export const partnershipSchema = z.object({
  companyName: z.string().trim().min(2, 'Please enter a company name').max(160),
  name,
  phone,
  email,
  details: optionalText,
  company: honeypot,
});

export const dropHintSchema = z.object({
  productName: z.string().trim().max(160),
  recipientFirstName: name,
  recipientEmail: email,
  senderFirstName: name,
  senderEmail: email,
  company: honeypot,
});

const orderItemSchema = z.object({
  productId: z.string().max(60),
  name: z.string().max(160),
  size: z.string().max(60),
  boxColor: z.string().max(60),
  quantity: z.number().int().min(1).max(50),
  unitPrice: z.number().nonnegative(),
});

export const orderSchema = z.object({
  recipientName: name,
  recipientPhone: phone,
  shippingMethod: z.enum(['delivery', 'pickup']),
  address: optionalText,
  cardMessage: optionalText,
  items: z.array(orderItemSchema).min(1, 'Your bag is empty'),
  company: honeypot,
}).refine(
  (v) => v.shippingMethod !== 'delivery' || (v.address ?? '').trim().length > 5,
  { path: ['address'], message: 'Please enter a delivery address' }
);

export type CallRequest = z.infer<typeof callRequestSchema>;
export type CustomRequest = z.infer<typeof customRequestSchema>;
export type Partnership = z.infer<typeof partnershipSchema>;
export type DropHint = z.infer<typeof dropHintSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;

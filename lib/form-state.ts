/**
 * Shared shape returned by every form Server Action.
 *
 * Lives outside `app/actions/submissions.ts` because a `'use server'` module
 * may only export async functions — exporting the `initialFormState` object
 * from there fails at runtime.
 */
export interface FormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Record<string, string[]>;
  /**
   * What the visitor typed, echoed back on failure.
   *
   * React resets an uncontrolled `<form action={…}>` once the action settles,
   * so without this a validation error wiped every field — on the checkout
   * that meant re-typing the whole order.
   */
  values?: Record<string, string>;
}

export const initialFormState: FormState = { status: 'idle' };

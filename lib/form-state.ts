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
}

export const initialFormState: FormState = { status: 'idle' };

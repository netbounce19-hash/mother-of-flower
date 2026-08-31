'use client';

import { useFormStatus } from 'react-dom';

/**
 * Off-screen field that humans never see and bots reliably fill in.
 * Named `company` because that is what most form-filling bots look for.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <span className="text-[#C0392B] text-[12px] mt-1 tracking-wide" role="alert">
      {messages[0]}
    </span>
  );
}

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

export function SubmitButton({
  children,
  pendingLabel = 'Sending…',
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      style={{ ...style, opacity: pending ? 0.6 : 1, cursor: pending ? 'wait' : 'pointer' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

'use client';

import { useState } from 'react';
import { FieldError } from '@/components/forms/FormBits';

/**
 * Formats digits as the visitor types: +1 (725) 224-2454.
 * Only US-style input is masked; anything starting with a non-US country code
 * is left alone so international numbers still work.
 */
export function formatUsPhone(raw: string): string {
  if (raw.trim().startsWith('+') && !raw.trim().startsWith('+1')) return raw;

  const digits = raw.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `+1 (${digits}`;
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

interface PhoneFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string[];
  defaultValue?: string;
  className?: string;
  labelClassName?: string;
}

export default function PhoneField({
  id,
  name,
  label,
  required,
  error,
  defaultValue = '',
  className,
  labelClassName = 'text-[12px] font-bold tracking-wide uppercase text-[#5A5A5A]',
}: PhoneFieldProps) {
  const [value, setValue] = useState(formatUsPhone(defaultValue));

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClassName}>
        {label} {required && <span className="text-[#8A6A2E]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required={required}
        placeholder="+1 (725) 224-2454"
        value={value}
        onChange={(e) => setValue(formatUsPhone(e.target.value))}
        className={
          className ??
          'w-full bg-transparent border-b border-[#D1D1D1] py-2 text-[14px] text-[#1C1C1C] placeholder:text-[#8A8A8A] focus:outline-none focus:border-[#1C1C1C] hover:border-[#6B6B6B] transition-colors rounded-none'
        }
      />
      <FieldError messages={error} />
    </div>
  );
}

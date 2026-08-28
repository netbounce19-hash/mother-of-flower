'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  words: string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Types words out one character at a time.
 *
 * Purely decorative: callers should render the real text alongside it (e.g. in
 * a visually-hidden span) so crawlers and assistive tech never depend on this
 * component having run.
 */
export function Typewriter({
  words,
  speed = 80,
  delayBetweenWords = 2000,
  cursor = true,
  className = '',
  'aria-hidden': ariaHidden,
}: TypewriterProps) {
  const [text, setText] = useState('');

  // Kept in a ref so a new array literal from the parent doesn't restart the
  // animation on every render.
  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const list = wordsRef.current;
    if (list.length === 0) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = list[wordIndex];

      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));

        if (charIndex === word.length) {
          // A single word settles and stays put.
          if (list.length === 1) return;
          deleting = true;
          timer = setTimeout(tick, delayBetweenWords);
          return;
        }
        timer = setTimeout(tick, speed);
        return;
      }

      charIndex -= 1;
      setText(word.slice(0, charIndex));

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % list.length;
      }
      timer = setTimeout(tick, speed / 2);
    };

    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [speed, delayBetweenWords]);

  return (
    <span className={className} aria-hidden={ariaHidden}>
      {text}
      {cursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  className?: string;
}

export function Typewriter({
  words,
  speed = 80,
  delayBetweenWords = 2000,
  cursor = true,
  className = '',
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        timer = setTimeout(handleType, speed / 2); // Delete faster
      } else {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
        timer = setTimeout(handleType, speed);
      }

      if (!isDeleting && currentText === fullWord) {
        // If there is only one word, stop typing and don't delete
        if (words.length > 1) {
          timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delayBetweenWords]);

  return (
    <span className={className}>
      {currentText}
      {cursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

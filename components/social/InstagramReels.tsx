'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Play } from 'lucide-react';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE,
  instagramPosts,
} from '@/content/instagram';
import { useCanHover, usePrefersReducedMotion } from '@/hooks/useMediaPreferences';

function PostCard({
  post,
  index,
}: {
  post: (typeof instagramPosts)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const canHover = useCanHover();
  const reducedMotion = usePrefersReducedMotion();

  // Clips load on intent only — never on mount, and never on a device that
  // cannot hover or where motion is reduced.
  const previewAllowed = canHover && !reducedMotion;

  const start = () => {
    if (!previewAllowed) return;
    setRequested(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };
  const stop = () => videoRef.current?.pause();

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={start}
      onMouseLeave={stop}
      className="group relative block overflow-hidden rounded-[3px] bg-[#F7F5F2] no-underline"
      style={{ aspectRatio: '9 / 16' }}
    >
      <Image
        src={post.posterSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {previewAllowed && requested && (
        <video
          ref={videoRef}
          src={post.videoSrc}
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/25 to-transparent" />

      <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FDFDFD]/85 flex items-center justify-center">
        <Play size={13} strokeWidth={2} className="ml-0.5 text-[#1C1C1C]" aria-hidden="true" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="block text-[12px] leading-[1.5] text-[#FDFDFD] line-clamp-3">
          {post.caption}
        </span>
      </span>
    </motion.a>
  );
}

export default function InstagramReels() {
  return (
    <section className="w-full bg-surface site-section">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8A6A2E] mb-2">
              Follow our story
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.1] text-[#1C1C1C]">
              {INSTAGRAM_HANDLE}
            </h2>
          </div>

          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto border border-[#1C1C1C] text-[#1C1C1C] text-[13px] font-bold uppercase tracking-[0.04em] px-8 py-3.5 rounded-[2px] no-underline hover:bg-[#1C1C1C] hover:text-[#FDFDFD] transition-colors duration-300"
          >
            <Camera size={15} strokeWidth={1.8} aria-hidden="true" />
            Follow on Instagram
          </a>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {instagramPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Send, Bookmark, X, Music } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Local Instagram SVG Icon since brand icons are not in this version of lucide-react
function Instagram({ size = 24, color = 'currentColor', strokeWidth = 2, className = '' }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface Comment {
  user: string;
  text: string;
}

interface Reel {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  views: string;
  likes: number;
  comments: Comment[];
  music: string;
}

const REELS_DATA: Reel[] = [
  {
    id: 'r1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=600&auto=format&fit=crop&q=85',
    caption: 'White garden roses, gathered in silk ✦ Handmade with love in Las Vegas. Perfect for anniversary or just because.',
    views: '42.8K',
    likes: 2492,
    music: 'mother_of_flower • Original Audio',
    comments: [
      { user: 'sophia.lv', text: 'Stunning! Absolutely in love with this arrangement 😍' },
      { user: 'charlotte_florals', text: 'The movement in this video is so dreamy!' },
      { user: 'motherofflower_fan', text: "Ordered this yesterday, can't wait for delivery!" }
    ]
  },
  {
    id: 'r2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-against-blue-sky-4591-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1487530811015-780d8174f23e?w=600&auto=format&fit=crop&q=85',
    caption: 'Look up. Bloom anyway. Beautiful garden notes under the Las Vegas sky ✦',
    views: '31.5K',
    likes: 1804,
    music: 'Lana Del Rey • Young and Beautiful (Sped Up)',
    comments: [
      { user: 'olivia_blossoms', text: 'This is pure poetry 🌸' },
      { user: 'james_reads', text: 'Wow, magnificent colors!' }
    ]
  },
  {
    id: 'r3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-happily-in-a-field-of-flowers-4702-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=85',
    caption: 'Lost in the blossoms. Running through fields of fresh inspiration for our new designs. ✦ Same-day delivery across Las Vegas!',
    views: '89.2K',
    likes: 7201,
    music: 'mother_of_flower • Field of Flowers',
    comments: [
      { user: 'lily.valleys', text: 'This feels like a fairy tale! ✨' },
      { user: 'emma.smith', text: 'Do you deliver to Summerlin?' },
      { user: 'mother_of_flower', text: '@emma.smith Yes! We offer same-day delivery throughout the entire Las Vegas valley.' }
    ]
  },
  {
    id: 'r4',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-very-close-shot-of-the-leaves-of-a-tree-wet-18310-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1548460562-c8aff87c8b9a?w=600&auto=format&fit=crop&q=85',
    caption: 'Fresh morning dew on our green accents. Every leaf is hand-selected and cleaned to perfection. 🍃',
    views: '18.3K',
    likes: 1142,
    music: 'Ludovico Einaudi • Experience',
    comments: [
      { user: 'isabella_gardens', text: 'The attention to detail is unmatched.' },
      { user: 'garden_design_lv', text: 'Foliage goals!' }
    ]
  },
  {
    id: 'r5',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1510832198440-a52376950479?w=600&auto=format&fit=crop&q=85',
    caption: 'Crafting beautiful memories that bloom forever. Moments to cherish with Mother of Flower. ✦',
    views: '56.4K',
    likes: 3912,
    music: 'Taylor Swift • Cardigan (Instrumental)',
    comments: [
      { user: 'grace.memories', text: 'This is so sweet ❤️' },
      { user: 'liam_flowers', text: 'Beautifully captured.' }
    ]
  }
];

function ReelCard({ reel, delayIndex, onOpen }: { reel: Reel; delayIndex: number; onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        // Play video on hover (must be muted)
        videoRef.current.play().catch((e) => console.log('Hover play blocked:', e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delayIndex * 0.1, ease: EASE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(180px, 22vw, 240px)',
        aspectRatio: '9/16',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'block',
        backgroundColor: '#000',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      }}
    >
      {/* Video Preview */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        poster={reel.thumbnail}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Play icon overlay on hover */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`,
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.4)',
          pointerEvents: 'none',
        }}
      >
        <Play size={18} color="#fff" fill="#fff" strokeWidth={0} style={{ marginLeft: 2 }} />
      </div>

      {/* Instagram logo top-right */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <Instagram size={14} color="#fff" strokeWidth={1.8} />
      </div>

      {/* Views badge top-left */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          padding: '4px 8px',
          borderRadius: 20,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Play size={8} color="#fff" fill="#fff" strokeWidth={0} />
        <span style={{ fontSize: 10, color: '#fff', fontWeight: 500, letterSpacing: '0.04em' }}>{reel.views}</span>
      </div>

      {/* Caption summary bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 14px 14px',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: '#fff',
            lineHeight: 1.4,
            fontWeight: 400,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        >
          {reel.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function InstagramReels() {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [commentInput, setCommentInput] = useState('');
  const [customComments, setCustomComments] = useState<Record<string, Comment[]>>({});

  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Synchronize play/pause state of video
  useEffect(() => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [isPlaying, selectedReel]);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const duration = modalVideoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  // Toggle video playback
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle video mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const openReel = (reel: Reel) => {
    setSelectedReel(reel);
    setIsPlaying(true);
    setProgress(0);
  };

  const closeReel = () => {
    setSelectedReel(null);
  };

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));
  };

  const handleAddComment = (e: React.FormEvent, reelId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      user: 'you',
      text: commentInput.trim(),
    };

    setCustomComments((prev) => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), newComment],
    }));
    setCommentInput('');
  };

  return (
    <section style={{ width: '100%', backgroundColor: '#FAF9F6', paddingTop: 90, paddingBottom: 100 }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          paddingLeft: 'clamp(20px, 5vw, 72px)',
          paddingRight: 'clamp(20px, 5vw, 72px)',
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 54 }}
        >
          {/* Instagram gradient icon container */}
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              marginBottom: 20,
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(220, 39, 67, 0.2)',
            }}
          >
            <Instagram size={24} color="#fff" strokeWidth={1.8} />
          </div>

          <p style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: 12, fontWeight: 500 }}>
            FOLLOW OUR STORY
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              color: '#1C1C1C',
              lineHeight: 1.05,
              marginBottom: 14,
              fontWeight: 400,
            }}
          >
            @mother_of_flower
          </h2>
          <p style={{ fontSize: 14, color: '#8A8A8A', lineHeight: 1.7, maxWidth: 460 }}>
            Behind every bouquet is a story of luxury, design, and detail. Explore our Reels and find your floral inspiration.
          </p>
        </motion.div>

        {/* Reels Horizontal Row */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            overflowX: 'auto',
            paddingBottom: 16,
            scrollbarWidth: 'none',
          }}
          className="reels-scroll"
        >
          {REELS_DATA.map((reel, idx) => (
            <ReelCard key={reel.id} reel={reel} delayIndex={idx} onOpen={() => openReel(reel)} />
          ))}
        </div>

        {/* View on Instagram Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}
        >
          <a
            href="https://www.instagram.com/mother_of_flower/reels/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 30px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(220, 39, 67, 0.25)',
              transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(220, 39, 67, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 39, 67, 0.25)';
            }}
          >
            <Instagram size={15} strokeWidth={1.8} />
            View All Reels on Instagram
          </a>
        </motion.div>
      </div>

      {/* Lightbox Video Modal (Instagram-style UI) */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(10px, 3vw, 24px)',
            }}
            onClick={closeReel}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '860px',
                aspectRatio: '16/10',
                backgroundColor: '#000',
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}
              className="max-md:flex-col max-md:aspect-auto max-md:h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Video Container */}
              <div
                style={{
                  position: 'relative',
                  flex: '1 1 55%',
                  backgroundColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                className="max-md:h-[60%] max-md:w-full"
                onClick={togglePlay}
              >
                {/* Video Element */}
                <video
                  ref={modalVideoRef}
                  src={selectedReel.videoUrl}
                  loop
                  autoPlay
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />

                {/* Video Overlay Center play/pause feedback */}
                {!isPlaying && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    <Play size={24} color="#fff" fill="#fff" strokeWidth={0} style={{ marginLeft: 3 }} />
                  </div>
                )}

                {/* Floating controls */}
                {/* Top Corner: Mute Toggle */}
                <button
                  onClick={toggleMute}
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Floating Close Button for Mobile only */}
                <button
                  onClick={closeReel}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                  className="md:hidden flex"
                >
                  <X size={18} />
                </button>

                {/* Custom Video Progress Line */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      backgroundColor: '#C9A96E',
                      transition: 'width 0.1s linear',
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Instagram-style Sidebar (Desktop) / Absolute Overlay on Mobile */}
              <div
                style={{
                  flex: '1 1 45%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                }}
                className="max-md:flex-1 max-md:w-full"
              >
                {/* Close Button (Desktop) */}
                <button
                  onClick={closeReel}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: '#8A8A8A',
                    padding: 4,
                    zIndex: 10,
                  }}
                  className="max-md:hidden hover:color-graphite transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Header (User profile row) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderBottom: '1px solid #F0EFEA',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Circle Logo Monogram */}
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        backgroundColor: '#1C1C1C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#C9A96E',
                          letterSpacing: '0.04em',
                        }}
                      >
                        MF
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C', display: 'flex', alignItems: 'center', gap: 4 }}>
                        mother_of_flower
                        <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#C9A96E' }} />
                      </span>
                      <span style={{ fontSize: 11, color: '#8A8A8A' }}>Las Vegas, Nevada</span>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/mother_of_flower/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#C9A96E',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    Follow
                  </a>
                </div>

                {/* Captions + Comments Area */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                  className="custom-scrollbar"
                >
                  {/* Caption */}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: '#1C1C1C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, color: '#C9A96E' }}>MF</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p style={{ fontSize: 12.5, color: '#1C1C1C', lineHeight: 1.5 }}>
                        <span style={{ fontWeight: 600, marginRight: 6 }}>mother_of_flower</span>
                        {selectedReel.caption}
                      </p>
                      <span style={{ fontSize: 10, color: '#8A8A8A' }}>2d</span>
                    </div>
                  </div>

                  {/* Standard Mock Comments */}
                  {selectedReel.comments.map((comment, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: '#F0EFEA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: 10,
                          fontWeight: 500,
                          color: '#8A8A8A',
                          textTransform: 'uppercase',
                        }}
                      >
                        {comment.user.slice(0, 2)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ fontSize: 12.5, color: '#1C1C1C', lineHeight: 1.5 }}>
                          <span style={{ fontWeight: 600, marginRight: 6 }}>{comment.user}</span>
                          {comment.text}
                        </p>
                        <span style={{ fontSize: 10, color: '#8A8A8A' }}>1d</span>
                      </div>
                    </div>
                  ))}

                  {/* Custom Written Comments */}
                  {(customComments[selectedReel.id] || []).map((comment, idx) => (
                    <div key={`custom-${idx}`} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: '#C9A96E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: 10,
                          fontWeight: 500,
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}
                      >
                        {comment.user.slice(0, 2)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ fontSize: 12.5, color: '#1C1C1C', lineHeight: 1.5 }}>
                          <span style={{ fontWeight: 600, marginRight: 6 }}>{comment.user}</span>
                          {comment.text}
                        </p>
                        <span style={{ fontSize: 10, color: '#8A8A8A' }}>Just now</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom interactive action layout */}
                <div
                  style={{
                    borderTop: '1px solid #F0EFEA',
                    padding: '16px 20px',
                    backgroundColor: '#FFF',
                  }}
                >
                  {/* Action Icons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      {/* Heart Button */}
                      <button
                        onClick={() => toggleLike(selectedReel.id)}
                        style={{ color: likedReels[selectedReel.id] ? '#E02424' : '#1C1C1C', padding: 0 }}
                      >
                        <Heart size={22} fill={likedReels[selectedReel.id] ? '#E02424' : 'none'} strokeWidth={1.8} />
                      </button>

                      {/* Comment Trigger Icon */}
                      <button style={{ color: '#1C1C1C', padding: 0 }}>
                        <MessageCircle size={22} strokeWidth={1.8} />
                      </button>

                      {/* Direct Send Icon */}
                      <button style={{ color: '#1C1C1C', padding: 0 }}>
                        <Send size={20} strokeWidth={1.8} />
                      </button>
                    </div>

                    <button style={{ color: '#1C1C1C', padding: 0 }}>
                      <Bookmark size={21} strokeWidth={1.8} />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1C', marginBottom: 6 }}>
                    {((likedReels[selectedReel.id] ? selectedReel.likes + 1 : selectedReel.likes)).toLocaleString()} likes
                  </div>

                  {/* Music Track */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8A8A8A', fontSize: 11, marginBottom: 16 }}>
                    <Music size={11} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedReel.music}
                    </span>
                  </div>

                  {/* Input form */}
                  <form
                    onSubmit={(e) => handleAddComment(e, selectedReel.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      borderTop: '1px solid #FAF9F6',
                      paddingTop: 12,
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: 12,
                        color: '#1C1C1C',
                        backgroundColor: 'transparent',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!commentInput.trim()}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: commentInput.trim() ? '#C9A96E' : '#C9A96E40',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: commentInput.trim() ? 'pointer' : 'default',
                      }}
                    >
                      Post
                    </button>
                  </form>
                </div>

                {/* Big Gradient CTA bottom-most */}
                <div style={{ padding: '0 20px 16px 20px' }}>
                  <a
                    href={`https://www.instagram.com/mother_of_flower/reels/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '12px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      color: '#FFF',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(220,39,67,0.15)',
                      textAlign: 'center',
                    }}
                  >
                    <Instagram size={14} />
                    Watch original Reel on Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

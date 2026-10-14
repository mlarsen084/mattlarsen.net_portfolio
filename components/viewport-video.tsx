'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import type { VideoHTMLAttributes } from 'react';

type Props = VideoHTMLAttributes<HTMLVideoElement> & { src: string };

// Decorative previews download only near the viewport and pause when out of view.
export const ViewportVideo = forwardRef<HTMLVideoElement, Props>(function ViewportVideo(
  { src, autoPlay = true, ...props },
  forwardedRef,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [nearby, setNearby] = useState(false);
  const assignRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      setNearby(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { rootMargin: '150px 0px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    const syncPlayback = () => {
      if (loaded && nearby && autoPlay && !document.hidden && !motion.matches) {
        video.play().then(() => {
          if (cancelled) video.pause();
        }).catch(() => {});
      } else {
        video.pause();
      }
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    motion.addEventListener('change', syncPlayback);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', syncPlayback);
      motion.removeEventListener('change', syncPlayback);
      video.pause();
    };
  }, [autoPlay, loaded, nearby, src]);

  return <video {...props} ref={assignRef} src={loaded ? src : undefined} preload="none" />;
});

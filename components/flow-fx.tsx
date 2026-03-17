'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function FlowFx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    const updateDotScroll = () => {
      root.style.setProperty('--dot-scroll', `${Math.round(window.scrollY * -0.08)}px`);
    };
    const updateDotPointer = (event: globalThis.MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      root.style.setProperty('--dot-shift-x', `${x.toFixed(2)}px`);
      root.style.setProperty('--dot-shift-y', `${y.toFixed(2)}px`);
    };

    updateDotScroll();
    window.addEventListener('scroll', updateDotScroll, { passive: true });
    window.addEventListener('mousemove', updateDotPointer, { passive: true });

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) {
      return () => {
        window.removeEventListener('scroll', updateDotScroll);
        window.removeEventListener('mousemove', updateDotPointer);
      };
    }

    const animations = nodes.map((node) => {
      const delayIndex = Number(node.style.getPropertyValue('--d') || '0');
      return gsap.fromTo(
        node,
        { opacity: 0, y: 30, scale: 0.985, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          delay: delayIndex * 0.1,
          duration: 1.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 92%',
            once: true,
          },
        },
      );
    });

    return () => {
      window.removeEventListener('scroll', updateDotScroll);
      window.removeEventListener('mousemove', updateDotPointer);
      animations.forEach((anim) => anim.kill());
    };
  }, []);

  return null;
}

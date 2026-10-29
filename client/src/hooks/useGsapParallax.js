import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable hook for smooth scroll parallax effect on an element
 * 
 * @param {Object} [options]
 * @param {number} [options.speed=0.25] - Parallax factor (positive or negative)
 * @param {string} [options.selector] - Optional child selector, or animates the container directly
 * @returns {React.RefObject} scopeRef
 */
export const useGsapParallax = (options = {}) => {
  const containerRef = useRef(null);
  const { speed = 0.25, selector } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const target = selector
        ? containerRef.current.querySelector(selector)
        : containerRef.current;

      if (!target) return;

      const yMovement = speed * 150;

      gsap.fromTo(
        target,
        { y: -yMovement },
        {
          y: yMovement,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    },
    { scope: containerRef, dependencies: [speed, selector] }
  );

  return containerRef;
};

export default useGsapParallax;

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable hook for fade + slide up entrance animation on scroll
 * Respects prefers-reduced-motion accessibility preference
 * 
 * @param {Object} [options]
 * @param {string} [options.selector] - CSS selector inside the container to animate
 * @param {number} [options.y=40] - Vertical start offset
 * @param {number} [options.duration=0.8] - Animation duration
 * @param {string} [options.ease="power3.out"] - GSAP easing equation
 * @param {number} [options.stagger=0.12] - Stagger between matched elements
 * @param {string} [options.start="top 85%"] - ScrollTrigger start position
 * @param {boolean} [options.immediate=false] - Run immediately on mount without ScrollTrigger
 * @returns {React.RefObject} scopeRef to attach to the target container
 */
export const useGsapReveal = (options = {}) => {
  const containerRef = useRef(null);

  const {
    selector,
    y = 40,
    duration = 0.8,
    ease = 'power3.out',
    stagger = 0.12,
    start = 'top 85%',
    immediate = false
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check user system preference for reduced motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const targets = selector
        ? containerRef.current.querySelectorAll(selector)
        : containerRef.current;

      if (!targets || (targets.length === 0 && selector)) return;

      if (prefersReducedMotion) {
        // If reduced motion is requested, show elements immediately without animation
        gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
        return;
      }

      // Initial state
      gsap.set(targets, { opacity: 0, y });

      if (immediate) {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          clearProps: 'transform'
        });
      } else {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true
          },
          clearProps: 'transform'
        });
      }
    },
    { scope: containerRef, dependencies: [selector, y, duration, ease, stagger, immediate] }
  );

  return containerRef;
};

export default useGsapReveal;

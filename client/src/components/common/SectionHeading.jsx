import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SectionHeading Component
 * Displays section headers with optional eyebrow and subtitle, animated via GSAP ScrollTrigger.
 */
export const SectionHeading = ({
  title,
  subtitle = '',
  eyebrow = '',
  align = 'left',
  className = ''
}) => {
  const containerRef = useRef(null);

  const alignClass = {
    left: 'text-start me-auto',
    center: 'text-center mx-auto',
    right: 'text-end ms-auto'
  }[align] || 'text-start';

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const items = containerRef.current.querySelectorAll('.section-heading-item');

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    },
    { scope: containerRef, dependencies: [title, subtitle, eyebrow] }
  );

  return (
    <div
      ref={containerRef}
      className={`section-heading mb-4 mb-md-5 ${alignClass} ${className}`}
      style={{ maxWidth: align === 'center' ? '720px' : '640px' }}
    >
      {eyebrow && (
        <span className="section-heading-item text-eyebrow d-block mb-2">
          {eyebrow}
        </span>
      )}

      <h2 className="section-heading-item section-title">
        {title}
      </h2>

      {subtitle && (
        <p className="section-heading-item section-subtitle mt-2 mb-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  eyebrow: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string
};

export default SectionHeading;

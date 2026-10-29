import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HeroHeading Component
 * Renders bold uppercase hero headlines with split-line GSAP entrance animation.
 */
export const HeroHeading = ({
  lines = [],
  subtitle = '',
  ghostText = '',
  className = ''
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const lineElements = containerRef.current.querySelectorAll('.hero-heading__line-inner');
      const subtitleEl = containerRef.current.querySelector('.hero-heading__subtitle');

      if (prefersReducedMotion) {
        gsap.set(lineElements, { yPercent: 0, opacity: 1 });
        if (subtitleEl) gsap.set(subtitleEl, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        lineElements,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14
        }
      );

      if (subtitleEl) {
        tl.fromTo(
          subtitleEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
      }
    },
    { scope: containerRef, dependencies: [lines, subtitle] }
  );

  return (
    <div ref={containerRef} className={`hero-heading position-relative ${className}`}>
      {ghostText && <div className="hero-ghost-text" aria-hidden="true">{ghostText}</div>}
      
      <h1 className="hero-title">
        {lines.map((line, idx) => (
          <span
            key={idx}
            className="d-block overflow-hidden"
            style={{ paddingBottom: '0.08em' }}
          >
            <span className="hero-heading__line-inner d-inline-block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      {subtitle && (
        <p className="hero-heading__subtitle hero-subtitle mt-3 mb-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};

HeroHeading.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  subtitle: PropTypes.string,
  ghostText: PropTypes.string,
  className: PropTypes.string
};

export default HeroHeading;

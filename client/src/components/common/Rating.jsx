import React from 'react';
import PropTypes from 'prop-types';

/**
 * Rating Component
 * Renders 5 star rating icons using design tokens for filled and empty stars
 */
export const Rating = ({
  value = 5,
  count = null,
  showValue = false,
  size = 14,
  className = ''
}) => {
  const stars = [1, 2, 3, 4, 5];
  const roundedValue = Math.min(5, Math.max(0, Number(value) || 0));

  return (
    <div
      className={`rating-sole ${className}`}
      aria-label={`Rating: ${roundedValue} out of 5 stars`}
    >
      <div className="d-inline-flex align-items-center">
        {stars.map((starIndex) => {
          const isFilled = roundedValue >= starIndex;
          const isHalf = !isFilled && roundedValue >= starIndex - 0.5;

          return (
            <svg
              key={starIndex}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={isFilled ? 'var(--color-star-filled)' : 'none'}
              stroke={isFilled ? 'var(--color-star-filled)' : 'var(--color-star-empty)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`rating-sole__star ${
                isFilled ? 'rating-sole__star--filled' : 'rating-sole__star--empty'
              }`}
            >
              {isHalf ? (
                <>
                  <defs>
                    <linearGradient id={`half-star-${starIndex}`}>
                      <stop offset="50%" stopColor="var(--color-star-filled)" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    fill={`url(#half-star-${starIndex})`}
                    stroke="var(--color-star-filled)"
                  />
                </>
              ) : (
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              )}
            </svg>
          );
        })}
      </div>

      {showValue && (
        <span className="rating-sole__text">{roundedValue.toFixed(1)}</span>
      )}

      {count !== null && (
        <span className="rating-sole__count">({count})</span>
      )}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number,
  count: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string
};

export default Rating;

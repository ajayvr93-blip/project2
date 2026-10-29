import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge Component
 * Studio pill badge for tags like "Featured", "Sale", "New", "Trending"
 */
export const Badge = ({
  children,
  variant = 'mint',
  className = ''
}) => {
  return (
    <span className={`badge-sole badge-sole--${variant} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['mint', 'sale', 'dark', 'neutral']),
  className: PropTypes.string
};

export default Badge;

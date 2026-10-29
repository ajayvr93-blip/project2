import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loader Component
 * Minimalist studio loading spinner
 */
export const Loader = ({ text = 'Loading sneakers...', className = '' }) => {
  return (
    <div className={`loader-sole ${className}`} role="status">
      <div className="loader-sole__spinner" />
      {text && <span className="loader-sole__text">{text}</span>}
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default Loader;

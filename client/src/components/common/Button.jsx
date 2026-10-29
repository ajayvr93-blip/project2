import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component
 * Reusable pill-shaped button supporting primary, secondary, outline, and ghost variants.
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  as: Component = 'button',
  className = '',
  disabled = false,
  ...rest
}, ref) => {
  const isIconOnly = !children && icon;

  const classes = [
    'btn-sole',
    `btn-sole--${variant}`,
    `btn-sole--${size}`,
    isIconOnly ? 'btn-sole--icon-only' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={Component === 'button' ? disabled : undefined}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="btn-sole__icon">{icon}</span>}
      {children && <span className="btn-sole__content">{children}</span>}
      {icon && iconPosition === 'right' && <span className="btn-sole__icon">{icon}</span>}
    </Component>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  as: PropTypes.elementType,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;

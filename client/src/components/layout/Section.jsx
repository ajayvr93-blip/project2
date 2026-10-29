import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

/**
 * Section Component
 * Provides consistent maximum container width, responsiveness, and vertical spacing tokens.
 */
export const Section = ({
  children,
  className = '',
  id,
  fluid = 'xl',
  variant = 'default',
  as: Component = 'section',
  ...rest
}) => {
  const variantClass = {
    default: 'section-sole',
    compact: 'section-sole section-sole--compact',
    heroGap: 'section-sole section-sole--hero-gap',
    white: 'section-sole bg-white'
  }[variant] || 'section-sole';

  return (
    <Component id={id} className={`${variantClass} ${className}`} {...rest}>
      <Container fluid={fluid} className="px-3 px-md-4">
        {children}
      </Container>
    </Component>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  variant: PropTypes.oneOf(['default', 'compact', 'heroGap', 'white']),
  as: PropTypes.elementType
};

export default Section;

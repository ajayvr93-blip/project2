import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component
 * Top-level page wrapper that provides the sticky Navbar, main content area, and Footer.
 */
export const Layout = ({
  children,
  cartCount = 2,
  onSearchSubmit,
  className = ''
}) => {
  return (
    <div className={`d-flex flex-column min-vh-100 ${className}`}>
      <Navbar cartCount={cartCount} onSearchSubmit={onSearchSubmit} />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cartCount: PropTypes.number,
  onSearchSubmit: PropTypes.func,
  className: PropTypes.string
};

export default Layout;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Navbar as BsNavbar, Container, Nav, Form } from 'react-bootstrap';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

/**
 * Navbar Component
 * Sticky responsive header with brand logo, category navigation, search input, and cart counter.
 */
export const Navbar = ({ cartCount = 2, onSearchSubmit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  const navLinks = [
    { label: 'MEN', to: '/shop?category=men' },
    { label: 'WOMEN', to: '/shop?category=women' },
    { label: 'KIDS', to: '/shop?category=kids' },
    { label: 'SALE', to: '/shop?sale=true', isSale: true },
    { label: 'ABOUT US', to: '/about' }
  ];

  return (
    <BsNavbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={(isExp) => setExpanded(isExp)}
      className={`navbar-sole ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <Container fluid="xl" className="px-3 px-md-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none"
          onClick={() => setExpanded(false)}
        >
          <span
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-secondary)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="var(--color-secondary)" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3.5" fill="var(--color-secondary)" />
            </svg>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'var(--color-primary)'
            }}
          >
            SOLE CIRCLE
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none d-lg-none p-1"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X size={24} color="var(--color-primary)" /> : <Menu size={24} color="var(--color-primary)" />}
        </button>

        {/* Collapsible Content */}
        <BsNavbar.Collapse id="navbar-nav" className="mt-3 mt-lg-0">
          {/* Centre Category Links */}
          <Nav className="mx-auto my-2 my-lg-0 align-items-lg-center">
            {navLinks.map((link) => (
              <Nav.Link
                as={NavLink}
                key={link.label}
                to={link.to}
                onClick={() => setExpanded(false)}
                className={`nav-link-sole ${link.isSale ? 'nav-link-sale' : ''}`}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right Action Items: Search + Cart */}
          <div className="d-flex align-items-center gap-3 ms-lg-2 pt-2 pt-lg-0">
            {/* Search Input */}
            <Form onSubmit={handleSearch} className="position-relative">
              <Search
                size={16}
                color="var(--color-text-muted)"
                className="position-absolute"
                style={{ top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="search"
                className="navbar-search-input"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search sneakers"
              />
            </Form>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="position-relative d-flex align-items-center justify-content-center text-decoration-none"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary)',
                transition: 'all 0.2s ease'
              }}
              aria-label="View Shopping Cart"
              onClick={() => setExpanded(false)}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number,
  onSearchSubmit: PropTypes.func
};

export default Navbar;

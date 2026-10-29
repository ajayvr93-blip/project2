import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

/**
 * Footer Component
 * 4 columns layout with newsletter signup and brand links
 */
export const Footer = ({ onNewsletterSubmit }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (onNewsletterSubmit) {
      onNewsletterSubmit(email);
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer-sole">
      <Container fluid="xl" className="px-3 px-md-4">
        <Row className="gy-4 gy-lg-0">
          {/* Column 1: Brand Mission */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-primary)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="3.5" fill="var(--color-primary)" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF'
                }}
              >
                SOLE CIRCLE
              </span>
            </div>
            <p style={{ color: '#A0A5AD', fontSize: '0.875rem', lineHeight: '1.7', maxWidth: '320px' }}>
              Precision-crafted sneakers engineered for modern cadence. Minimalist studio aesthetics, responsive cushioning, and zero compromise.
            </p>
            <div className="d-flex gap-3 mt-3">
              <span className="badge-sole badge-sole--mint">EST. 2026</span>
              <span className="badge-sole badge-sole--neutral" style={{ color: '#A0A5AD' }}>GLOBAL SHIPPING</span>
            </div>
          </Col>

          {/* Column 2: Shop */}
          <Col lg={2} sm={6}>
            <h4 className="footer-sole__heading">SHOP</h4>
            <Link to="/shop?category=men" className="footer-sole__link">Men's Footwear</Link>
            <Link to="/shop?category=women" className="footer-sole__link">Women's Footwear</Link>
            <Link to="/shop?category=kids" className="footer-sole__link">Kids Editions</Link>
            <Link to="/shop?tag=new" className="footer-sole__link">New Arrivals</Link>
            <Link to="/shop?sale=true" className="footer-sole__link" style={{ color: 'var(--color-secondary)' }}>
              Studio Sale
            </Link>
          </Col>

          {/* Column 3: Support */}
          <Col lg={2} sm={6}>
            <h4 className="footer-sole__heading">SUPPORT</h4>
            <Link to="/support/tracking" className="footer-sole__link">Track Order</Link>
            <Link to="/support/shipping" className="footer-sole__link">Shipping & Returns</Link>
            <Link to="/support/sizes" className="footer-sole__link">Shoe Size Guide</Link>
            <Link to="/support/care" className="footer-sole__link">Sneaker Care</Link>
            <Link to="/support/contact" className="footer-sole__link">Contact Studio</Link>
          </Col>

          {/* Column 4: Newsletter */}
          <Col lg={4} md={6}>
            <h4 className="footer-sole__heading">THE CIRCLE CLUB</h4>
            <p style={{ color: '#A0A5AD', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Subscribe for private drop alerts, members-only editorial access, and early season previews.
            </p>

            {subscribed ? (
              <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ backgroundColor: '#2F3338' }}>
                <CheckCircle2 size={18} color="var(--color-secondary)" />
                <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>
                  You are now on the guestlist.
                </span>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="footer-sole__newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight size={16} />}
                  iconPosition="right"
                >
                  Join
                </Button>
              </Form>
            )}
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="footer-sole__bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            &copy; {new Date().getFullYear()} Sole Circle Studio Ltd. All rights reserved.
          </div>
          <div className="d-flex gap-4">
            <Link to="/terms" className="footer-sole__link mb-0" style={{ fontSize: '0.8125rem' }}>
              Terms of Service
            </Link>
            <Link to="/privacy" className="footer-sole__link mb-0" style={{ fontSize: '0.8125rem' }}>
              Privacy Policy
            </Link>
            <Link to="/security" className="footer-sole__link mb-0" style={{ fontSize: '0.8125rem' }}>
              Security
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  onNewsletterSubmit: PropTypes.func
};

export default Footer;

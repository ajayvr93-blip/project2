import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import HeroHeading from '../common/HeroHeading';
import Button from '../common/Button';
import Badge from '../common/Badge';
import formatPrice from '../../utils/formatPrice';

/**
 * ProductHero Component
 * Showcase hero with split typography, floating GSAP sneaker loop, and product spotlight
 */
export const ProductHero = ({
  product,
  headingLines = ['FOREVER', 'FASTER.'],
  ghostText = 'SPEED',
  onAddToCart,
  className = ''
}) => {
  const containerRef = useRef(null);
  const shoeRef = useRef(null);
  const shadowRef = useRef(null);

  const defaultProduct = {
    name: 'AeroGlide Prism X9',
    subtitle: 'High-Cadence Urban Silhouette',
    description: 'Engineered with dual-density foam core and our signature mint responsive traction pod.',
    price: 13999,
    originalPrice: 16999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    slug: 'aeroglide-prism-x9',
    tag: 'NEW RELEASE'
  };

  const item = product || defaultProduct;

  useGSAP(
    () => {
      if (!shoeRef.current) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      // Gentle floating animation loop on the shoe
      gsap.to(shoeRef.current, {
        y: -18,
        rotate: -1.5,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Synchronized ground shadow breathing effect
      if (shadowRef.current) {
        gsap.to(shadowRef.current, {
          scaleX: 0.82,
          scaleY: 0.85,
          opacity: 0.45,
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      }
    },
    { scope: containerRef, dependencies: [item] }
  );

  return (
    <div ref={containerRef} className={`hero-wrapper ${className}`}>
      <Container fluid="xl" className="px-3 px-md-4">
        <Row className="align-items-center gy-5">
          {/* Left Column: Split Hero Headline */}
          <Col lg={4} className="order-2 order-lg-1">
            <div className="mb-3">
              <Badge variant="mint">{item.tag || 'NEW SEASON'}</Badge>
            </div>
            <HeroHeading
              lines={headingLines}
              subtitle="Studio edition engineered for high-cadence city life. Minimalist exterior, maximum propulsion."
            />
            <div className="d-flex align-items-center gap-3 mt-4 pt-2">
              <Button
                as={Link}
                to={`/shop/${item.slug || 'aeroglide-prism-x9'}`}
                variant="primary"
                size="lg"
                icon={<ArrowUpRight size={18} />}
                iconPosition="right"
              >
                EXPLORE DROP
              </Button>
              <Button
                as={Link}
                to="/shop"
                variant="ghost"
                size="lg"
              >
                VIEW LOOKBOOK
              </Button>
            </div>
          </Col>

          {/* Centre Column: Hero Sneaker with Ghost Text & Soft Floor Shadow */}
          <Col lg={5} className="order-1 order-lg-2 position-relative text-center">
            {/* Giant Faded Background Word */}
            <div className="hero-ghost-text" aria-hidden="true">
              {ghostText}
            </div>

            {/* Sneaker Visual Container */}
            <div className="hero-shoe-container my-3 my-lg-0">
              <img
                ref={shoeRef}
                src={item.image || (item.images && item.images[0])}
                alt={item.name}
                className="hero-shoe-image"
                style={{
                  maxHeight: '380px',
                  width: 'auto',
                  transformOrigin: 'center center'
                }}
              />
              <div ref={shadowRef} className="hero-floor-shadow" />
            </div>
          </Col>

          {/* Right Column: Spec, Price & Quick Action */}
          <Col lg={3} className="order-3">
            <div
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
              }}
            >
              <span className="text-eyebrow d-block mb-1">SPOTLIGHT MODEL</span>
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {item.name}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {item.description || item.subtitle}
              </p>

              {/* Price Details */}
              <div className="d-flex align-items-baseline gap-2 mb-4">
                <span className="font-price" style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  icon={<ShoppingBag size={18} />}
                  onClick={() => onAddToCart && onAddToCart(item)}
                >
                  ADD TO CART
                </Button>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top" style={{ borderColor: 'var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  COMPLIMENTARY SHIPPING
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary-dark)' }}>
                  IN STOCK
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ProductHero.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string,
    tag: PropTypes.string
  }),
  headingLines: PropTypes.arrayOf(PropTypes.string),
  ghostText: PropTypes.string,
  onAddToCart: PropTypes.func,
  className: PropTypes.string
};

export default ProductHero;

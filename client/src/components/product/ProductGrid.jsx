import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ProductGrid Component
 * Responsive 4/2/1 column layout of ProductCards with staggered GSAP ScrollTrigger entrance.
 */
export const ProductGrid = ({
  products = [],
  loading = false,
  onAddToCart,
  emptyMessage = 'No sneakers found in this drop.',
  className = ''
}) => {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      if (loading || !gridRef.current || products.length === 0) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const cards = gridRef.current.querySelectorAll('.grid-item-card');

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    },
    { scope: gridRef, dependencies: [products, loading] }
  );

  if (loading) {
    return <Loader text="Retrieving studio collection..." />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className={`product-grid ${className}`}>
      <Row className="gy-4 gx-3 gx-md-4">
        {products.map((product) => (
          <Col
            key={product._id || product.slug}
            xs={12}
            sm={6}
            lg={3}
            className="grid-item-card"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string,
      slug: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      images: PropTypes.arrayOf(PropTypes.string),
      rating: PropTypes.number,
      numReviews: PropTypes.number,
      tag: PropTypes.string
    })
  ).isRequired,
  loading: PropTypes.bool,
  onAddToCart: PropTypes.func,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};

export default ProductGrid;

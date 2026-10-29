import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plus } from 'lucide-react';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import formatPrice from '../../utils/formatPrice';

/**
 * ProductCard Component
 * Studio sneaker card with overlapping visual, hover lift, GSAP tilt, and instant add button.
 */
export const ProductCard = ({
  product,
  onAddToCart,
  className = ''
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const {
    name,
    brand = 'Sole Circle',
    price,
    originalPrice,
    images = [],
    rating = 4.5,
    numReviews = 0,
    slug,
    tag
  } = product || {};

  const displayImage = images && images.length > 0 ? images[0] : '';

  // GSAP Mouse Interaction for dynamic tilt effect
  useGSAP(
    () => {
      const card = cardRef.current;
      const img = imageRef.current;
      if (!card || !img) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const handleMouseEnter = () => {
        gsap.to(img, {
          scale: 1.08,
          rotation: -5,
          y: -6,
          duration: 0.4,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  const getBadgeVariant = (tagText) => {
    if (!tagText) return 'neutral';
    const lower = tagText.toLowerCase();
    if (lower.includes('sale')) return 'sale';
    if (lower.includes('new') || lower.includes('drop')) return 'mint';
    return 'dark';
  };

  return (
    <div ref={cardRef} className={`product-card ${className}`}>
      {/* Optional Tag / Badge */}
      {tag && (
        <div className="product-card__badge-wrap">
          <Badge variant={getBadgeVariant(tag)}>{tag}</Badge>
        </div>
      )}

      {/* Sneaker Image Container overlapping left edge */}
      <Link
        to={`/shop/${slug}`}
        className="product-card__image-wrap text-decoration-none"
        aria-label={`View details for ${name}`}
      >
        <img
          ref={imageRef}
          src={displayImage}
          alt={name}
          className="product-card__image"
          loading="lazy"
        />
      </Link>

      {/* Card Body Details */}
      <div className="product-card__details">
        <span className="product-card__brand">{brand}</span>
        
        <Link to={`/shop/${slug}`} className="text-decoration-none">
          <h3 className="product-card__title" title={name}>
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="my-1">
          <Rating value={rating} count={numReviews} showValue />
        </div>

        {/* Bottom Bar: Price & Circular "+" Add Button */}
        <div className="product-card__bottom">
          <div className="product-card__price-wrap">
            <span className="product-card__price">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="product-card__orig-price">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="product-card__add-btn"
            onClick={(e) => {
              e.preventDefault();
              if (onAddToCart) onAddToCart(product);
            }}
            aria-label={`Add ${name} to cart`}
            title="Add to cart"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
  onAddToCart: PropTypes.func,
  className: PropTypes.string
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import Section from '../components/layout/Section';
import Rating from '../components/common/Rating';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import { getProductBySlug } from '../services/api';
import formatPrice from '../utils/formatPrice';

export const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchItem = async () => {
      setLoading(true);
      const res = await getProductBySlug(slug);
      if (active) {
        setProduct(res.product);
        if (res.product && res.product.sizes) {
          setSelectedSize(res.product.sizes[0]);
        }
        setLoading(false);
      }
    };
    fetchItem();
    return () => { active = false; };
  }, [slug]);

  if (loading) return <Section><Loader text="Loading silhouette details..." /></Section>;

  if (!product) {
    return (
      <Section className="text-center py-5">
        <h2>Silhouette Not Found</h2>
        <Button as={Link} to="/shop" variant="primary" className="mt-3">Back to Studio</Button>
      </Section>
    );
  }

  return (
    <Section variant="heroGap">
      <Link to="/shop" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-4 text-muted fw-semibold">
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      <Row className="gy-4 align-items-center">
        <Col lg={6}>
          <div
            className="p-4 rounded-4 text-center"
            style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-md)' }}
          >
            <img
              src={product.images && product.images[0]}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: '420px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="ps-lg-4">
            <span className="text-eyebrow d-block mb-1">{product.brand}</span>
            <h1 className="section-title mb-2">{product.name}</h1>
            <div className="d-flex align-items-center gap-3 mb-3">
              <Rating value={product.rating} count={product.numReviews} showValue />
              <Badge variant="mint">In Stock</Badge>
            </div>

            <div className="d-flex align-items-baseline gap-2 mb-4">
              <span className="font-price" style={{ fontSize: '2rem' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
              {product.description}
            </p>

            <div className="my-4">
              <span className="fw-bold d-block mb-2 text-uppercase" style={{ fontSize: '0.8125rem' }}>Select Size (UK/IN)</span>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '42px',
                      height: '42px',
                      backgroundColor: selectedSize === size ? 'var(--color-primary)' : 'var(--color-surface)',
                      color: selectedSize === size ? '#FFFFFF' : 'var(--color-primary)',
                      border: '1px solid var(--color-border)',
                      fontWeight: 700
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="d-flex gap-3">
              <Button variant="secondary" size="lg" icon={<ShoppingBag size={18} />}>
                ADD TO CART
              </Button>
              <Button as={Link} to="/cart" variant="primary" size="lg">
                BUY NOW
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Section>
  );
};

export default ProductDetail;

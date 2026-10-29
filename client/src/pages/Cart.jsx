import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Section from '../components/layout/Section';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import formatPrice from '../utils/formatPrice';

export const Cart = () => {
  return (
    <Section variant="heroGap">
      <SectionHeading
        eyebrow="YOUR BAG"
        title="SHOPPING CART"
        subtitle="Review your selected studio footwear and proceed to checkout."
        align="left"
      />
      <div
        className="p-5 rounded-4 text-center"
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}
      >
        <ShoppingBag size={48} color="var(--color-text-muted)" className="mb-3" />
        <h3 className="h4 mb-2">Your Studio Bag is Ready</h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
          Explore our featured collection to discover newly engineered silhouettes.
        </p>
        <Button as={Link} to="/" variant="primary" size="md" icon={<ArrowRight size={16} />} iconPosition="right">
          CONTINUE BROWSING
        </Button>
      </div>
    </Section>
  );
};

export default Cart;

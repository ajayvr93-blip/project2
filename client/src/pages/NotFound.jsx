import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import Button from '../components/common/Button';

export const NotFound = () => {
  return (
    <Section className="text-center py-5">
      <div className="py-5">
        <span className="text-eyebrow d-block mb-2">ERROR 404</span>
        <h1 className="hero-title mb-3">SILHOUETTE NOT FOUND</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 2rem auto' }}>
          The studio release or page you were looking for doesn't exist or has moved.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          RETURN TO HOME
        </Button>
      </div>
    </Section>
  );
};

export default NotFound;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, RefreshCw, Sparkles, Check } from 'lucide-react';
import ProductHero from '../components/product/ProductHero';
import SectionHeading from '../components/common/SectionHeading';
import ProductGrid from '../components/product/ProductGrid';
import Section from '../components/layout/Section';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { getProducts } from '../services/api';

/**
 * Home Page (Demo)
 * Demonstrates the full component suite: Navbar, ProductHero, SectionHeading, ProductGrid, and Footer.
 */
export const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSneakers = async () => {
      setLoading(true);
      try {
        const result = await getProducts();
        if (isMounted) {
          setProducts(result.products || []);
          setDataSource(result.source || 'api');
        }
      } catch (err) {
        console.error('Failed to load sneakers in Home:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSneakers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdd = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
    setNotification(`Added "${item.name}" to cart`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const heroItem = products.length > 0 ? products[0] : null;

  return (
    <div className="home-page">
      {/* Toast Notification */}
      {notification && (
        <div
          className="position-fixed bottom-0 end-0 m-4 p-3 rounded-pill shadow-lg d-flex align-items-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            zIndex: 9999,
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          <span
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: '22px', height: '22px', backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            <Check size={14} strokeWidth={3} />
          </span>
          {notification}
        </div>
      )}

      {/* 1. Hero Section with GSAP Floating Sneaker and Ghost Text */}
      <ProductHero
        product={heroItem}
        headingLines={['FOREVER', 'FASTER.']}
        ghostText="SPEED"
        onAddToCart={handleAdd}
      />

      {/* 2. Studio Value Badges / Pillars */}
      <div className="border-bottom" style={{ borderColor: 'var(--color-border)', backgroundColor: '#F0F0F2' }}>
        <Container fluid="xl" className="py-4 px-3 px-md-4">
          <Row className="gy-3 text-center text-md-start">
            <Col sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <Zap size={20} color="var(--color-secondary-dark)" />
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, margin: 0 }}>DUAL DENSITY FOAM</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Dynamic energy return</p>
              </div>
            </Col>
            <Col sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <ShieldCheck size={20} color="var(--color-secondary-dark)" />
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, margin: 0 }}>STUDIO CERTIFIED</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>100% Authentic materials</p>
              </div>
            </Col>
            <Col sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <RefreshCw size={20} color="var(--color-secondary-dark)" />
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, margin: 0 }}>COMPLIMENTARY RETURNS</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>14-day studio exchange</p>
              </div>
            </Col>
            <Col sm={6} md={3} className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
              <Sparkles size={20} color="var(--color-secondary-dark)" />
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, margin: 0 }}>LIMITED RUNS</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Numbered studio batches</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 3. Featured Drops Section with ProductGrid */}
      <Section id="featured-drops" variant="heroGap">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <SectionHeading
            eyebrow="STUDIO CATALOG 2026"
            title="FEATURED RELEASES"
            subtitle="Precision-engineered silhouettes built for uncompromising performance and modern street cadence."
            align="left"
            className="mb-0"
          />

          <div className="mt-3 mt-md-0 d-flex align-items-center gap-2">
            {dataSource === 'mock-fallback' && (
              <Badge variant="neutral">Offline Mode Demo</Badge>
            )}
            <Button
              as={Link}
              to="/shop"
              variant="outline"
              size="sm"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              VIEW ALL (6)
            </Button>
          </div>
        </div>

        {/* Responsive ProductGrid with ScrollTrigger Entrance */}
        <ProductGrid
          products={products}
          loading={loading}
          onAddToCart={handleAdd}
        />
      </Section>

      {/* 4. Component Demonstration / Studio Showcase Banner */}
      <Section variant="compact" className="mb-5">
        <div
          className="p-4 p-md-5 rounded-4 position-relative overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Row className="align-items-center gy-4">
            <Col lg={7}>
              <Badge variant="sale" className="mb-3">STUDIO LABS</Badge>
              <h2 className="section-title mb-3">
                CRAFTED FOR MOTION.<br />TUNED FOR ARCHITECTURE.
              </h2>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', lineHeight: '1.7' }}>
                Every silhouette from Sole Circle undergoes rigorous lab testing to balance weight reduction with structural longevity. Explore our foundational engineering principles.
              </p>
              <div className="d-flex flex-wrap gap-2 pt-2">
                <Button variant="primary" size="md">EXPLORE ARCHIVE</Button>
                <Button variant="secondary" size="md">STUDIO LAB NOTE</Button>
                <Button variant="outline" size="md">MATERIALS</Button>
                <Button variant="ghost" size="md">SIZING SYSTEM</Button>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div
                className="p-4 rounded-4"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
              >
                <span className="text-eyebrow d-block mb-2">DESIGN SYSTEM TOKENS</span>
                <div className="d-flex justify-content-center gap-2 mb-3">
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} title="Primary: #1F2226" />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} title="Secondary: #6FD3C0" />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-dark)' }} title="Secondary Dark: #4DB8A4" />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-accent-red)' }} title="CTA Red: #E4262B" />
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-surface)', border: '1px solid #CCC' }} title="Surface: #FFFFFF" />
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Montserrat 800 Bold Headings &bull; Inter 400-600 Body &bull; 12px Card Radius &bull; Pill Actions
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Section>
    </div>
  );
};

export default Home;

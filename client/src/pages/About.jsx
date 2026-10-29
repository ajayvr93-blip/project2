import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const About = () => {
  return (
    <Section variant="heroGap">
      <div className="py-3">
        <Badge variant="mint" className="mb-3">OUR STUDIO STORY</Badge>
        <SectionHeading
          eyebrow="ABOUT SOLE CIRCLE"
          title="ARCHITECTURAL SILHOUETTES, ZERO EXCESS."
          subtitle="Born out of the pursuit for high-cadence urban movement without aesthetic compromise."
          align="left"
        />

        <Row className="gy-4 my-4 align-items-center">
          <Col lg={6}>
            <p style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 600, lineHeight: '1.7' }}>
              Sole Circle was founded on a simple design thesis: performance footwear should look as intentional as modern architecture.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
              We stripped away oversized logos, plastic gimmicks, and superfluous paneling to highlight the essence of proportion, lightweight ergonomics, and tactile studio materials. Each release is produced in numbered batches with carbon-neutral craftsmanship.
            </p>
            <div className="d-flex gap-3 mt-4">
              <Button as={Link} to="/shop" variant="primary" size="md">
                EXPLORE CURRENT DROP
              </Button>
              <Button as={Link} to="/" variant="outline" size="md">
                RETURN TO HOME
              </Button>
            </div>
          </Col>

          <Col lg={6}>
            <div
              className="p-4 p-md-5 rounded-4"
              style={{
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)'
              }}
            >
              <h3 className="h5 mb-3 fw-bold text-uppercase">The Studio Principles</h3>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                <li className="d-flex align-items-start gap-2">
                  <span className="badge-sole badge-sole--mint">01</span>
                  <div>
                    <strong>Precision Cushioning:</strong> Dual-density foam cores tuned for concrete and asphalt.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <span className="badge-sole badge-sole--dark">02</span>
                  <div>
                    <strong>Monochrome Restraint:</strong> Deep charcoals, studio whites, and singular accent mints.
                  </div>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <span className="badge-sole badge-sole--neutral">03</span>
                  <div>
                    <strong>Lifelong Circularity:</strong> Soles engineered for full disassembly and second-life recasting.
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Section>
  );
};

export default About;

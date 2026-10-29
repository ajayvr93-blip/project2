import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Section from '../components/layout/Section';
import SectionHeading from '../components/common/SectionHeading';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/common/Button';
import { getProducts } from '../services/api';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchItems = async () => {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      const res = await getProducts(params);
      if (active) {
        setProducts(res.products);
        setLoading(false);
      }
    };
    fetchItems();
    return () => { active = false; };
  }, [category]);

  const pageTitle = category ? `${category.toUpperCase()}'S FOOTWEAR` : 'ALL FOOTWEAR';

  return (
    <Section variant="heroGap">
      <SectionHeading
        eyebrow="STUDIO CATALOGUE"
        title={pageTitle}
        subtitle="Explore precision-crafted minimalist silhouettes for everyday cadence."
        align="left"
      />
      <ProductGrid products={products} loading={loading} />
    </Section>
  );
};

export default Shop;

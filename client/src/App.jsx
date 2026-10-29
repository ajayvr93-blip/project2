import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import NotFound from './pages/NotFound';

export const App = () => {
  const [cartCount, setCartCount] = useState(2);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <Router>
      <Layout cartCount={cartCount}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

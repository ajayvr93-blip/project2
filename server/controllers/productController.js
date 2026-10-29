import Product from '../models/Product.js';
import { sampleProducts } from '../seed/products.js';
import { isDbConnected } from '../config/db.js';

// @desc    Fetch all products with optional filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, featured, search } = req.query;

    if (!isDbConnected()) {
      // Graceful fallback to sample products if Mongo is offline
      let filtered = [...sampleProducts];

      if (category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (featured === 'true') {
        filtered = filtered.filter(p => p.isFeatured);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }

      return res.status(200).json({
        success: true,
        source: 'mock-fallback',
        count: filtered.length,
        data: filtered
      });
    }

    const query = {};
    if (category) query.category = category.toLowerCase();
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      source: 'database',
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message
    });
  }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!isDbConnected()) {
      const product = sampleProducts.find(p => p.slug === slug);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, source: 'mock-fallback', data: product });
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, source: 'database', data: product });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message
    });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (or Admin in future)
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Generate slug from name if not provided
    if (!productData.slug && productData.name) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (!isDbConnected()) {
      sampleProducts.unshift(productData);
      return res.status(201).json({
        success: true,
        source: 'mock-fallback',
        message: 'Product added to in-memory store',
        data: productData
      });
    }

    const product = new Product(productData);
    const createdProduct = await product.save();

    return res.status(201).json({
      success: true,
      source: 'database',
      data: createdProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(400).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

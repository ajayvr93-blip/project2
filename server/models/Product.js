import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      default: 'Sole Circle'
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    originalPrice: {
      type: Number,
      default: null
    },
    images: {
      type: [String],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'At least one image is required']
    },
    category: {
      type: String,
      required: true,
      enum: ['men', 'women', 'kids', 'unisex'],
      lowercase: true
    },
    sizes: {
      type: [Number],
      default: [6, 7, 8, 9, 10, 11]
    },
    colors: {
      type: [String],
      default: ['Charcoal', 'White', 'Mint']
    },
    rating: {
      type: Number,
      required: true,
      default: 4.5,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 10,
      min: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: '' // 'New Arrival', 'Sale', 'Trending', etc.
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

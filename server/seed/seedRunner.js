import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { sampleProducts } from './products.js';

dotenv.config();

const runSeed = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sole-circle';
  try {
    console.log(`Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully.');

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log(`Inserting ${sampleProducts.length} seed products...`);
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${inserted.length} products into database!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed script error:', error.message);
    process.exit(1);
  }
};

runSeed();

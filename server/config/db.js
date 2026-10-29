import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sole-circle';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Quick timeout to not block app startup if DB is offline
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB connection failed (${error.message}). Running in fallback mode with mock sneaker data.`);
    return null;
  }
};

export const isDbConnected = () => isConnected;

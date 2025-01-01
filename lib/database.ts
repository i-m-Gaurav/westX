import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log('New database connection established');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

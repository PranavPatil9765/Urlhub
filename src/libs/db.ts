import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is missing in environment variables!");
}

// Define the cached connection type
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Maintain a cached connection to avoid multiple instances
let cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn; // Use existing connection

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log("✅ MongoDB connected!");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};


(global as any).mongoose = cached;
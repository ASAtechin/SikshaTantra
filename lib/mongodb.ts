import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _shikshatantraMongoose: MongooseCache | undefined;
}

const cache: MongooseCache = global._shikshatantraMongoose ?? { conn: null, promise: null };
global._shikshatantraMongoose = cache;

/**
 * Lazily connects on first use so a missing MONGODB_URI fails the request
 * (503), never the build or the whole site.
 */
export async function dbConnect(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false, serverSelectionTimeoutMS: 5000 });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }

  return cache.conn;
}

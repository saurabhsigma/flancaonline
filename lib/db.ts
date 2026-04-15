import mongoose from "mongoose";

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectToDatabase() {
  // Reuse a single connection across hot reloads in development and across
  // requests in the same runtime to avoid exhausting MongoDB connection pools.
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If a stale connection object is cached, clear it so we reconnect.
  if (cached.conn && mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const mongoUri = MONGODB_URI;
    if (!mongoUri) {
      throw new Error("Missing MONGODB_URI environment variable.");
    }

    cached.promise = mongoose.connect(mongoUri, {
      dbName: "flanca",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  cached.promise = null;
  return cached.conn;
}

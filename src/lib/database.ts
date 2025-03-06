import mongoose, { Mongoose } from 'mongoose';

interface CachedConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URI as string, opts)
      .then((mongoose) => {
        console.log('DB connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('DB connection error:', err);
        throw new Error('Failed to connect to the database');
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

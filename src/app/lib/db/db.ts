import mongoose from "mongoose";

const dbConected = async (): Promise<void> => {
  // 1. إذا كان متصلاً بالفعل (readyState يساوي 1 أو أكثر)، اخرج مباشرة
  if (mongoose.connections[0].readyState >= 1) {
    return;
  }

  const mongooseURL = process.env.MONGODB_URI;

  if (!mongooseURL) {
    throw new Error("the URL is not defined");
  }

  try {
    await mongoose.connect(mongooseURL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Mongoose Connection Error:", error);
    throw error;
  }
};

export default dbConected;
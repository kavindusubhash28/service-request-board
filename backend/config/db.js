const mongoose = require("mongoose");

const connectDB = async () => {
  const primary = process.env.MONGODB_URI;
  const fallback = process.env.MONGODB_LOCAL || "mongodb://127.0.0.1:27017/service-request-board";

  // If a primary URI is provided, try it first.
  if (primary) {
    try {
      await mongoose.connect(primary);
      console.log("MongoDB Connected (primary)");
      return;
    } catch (error) {
      console.error("MongoDB Primary Connection Error:", error.message);
      console.log("Attempting local fallback MongoDB...");
      // fall through to attempt fallback
    }
  }

  // Try local/fallback connection before giving up
  try {
    await mongoose.connect(fallback);
    console.log("MongoDB Connected (fallback)");
  } catch (error) {
    console.error("MongoDB Fallback Connection Error:", error.message);
    console.error("Database connection could not be established. Continuing without DB connection - some routes may fail until you start MongoDB or correct the connection string.");
    // Do not exit the process so the dev server (nodemon) stays up; this helps debugging locally.
    // If you prefer the server to stop on DB failure, re-enable process.exit(1) here.
    return;
  }
};

module.exports = connectDB;

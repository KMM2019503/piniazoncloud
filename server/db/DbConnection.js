import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    const Conn = await mongoose.connect(process.env.DB_URL);
    console.log("🚀 ~ DbConnection ~ Conn:", "Connection success");
  } catch (error) {
    console.log("🚀 ~ DbConnection ~ error:", error.message);
    process.exit(1);
  }
};

import express from "express";
import dotenv from "dotenv";

import { DbConnection } from "./db/DbConnection.js";

import authRoutes from "./routes/auth.routes.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await DbConnection();

    app.listen(3007, () => {
      console.log("🚀 Server listening on port 3007");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

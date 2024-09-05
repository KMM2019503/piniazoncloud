import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors middleware

import { DbConnection } from "./db/DbConnection.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import imageRoutes from "./routes/image.routes.js";

import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials such as cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

app.use(errorHandler);

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

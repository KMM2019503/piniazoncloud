import express from "express";
import {
  login,
  logout,
  signup,
  verifyToken,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-token", verifyToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;

import express from "express";
import {
  login,
  logout,
  signup,
  verifyToken,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controllers.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/check-auth", checkToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-token", verifyToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;

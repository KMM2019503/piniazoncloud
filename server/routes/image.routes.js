import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import {
  uploadImage,
  getAllImages,
  FavouritedToggle,
  deleteImage,
  downloadImage,
} from "../controllers/image.controllers.js";
import upload from "../multer/multer.js";

const router = express.Router();

// Upload an image
router.post("/upload", checkToken, upload.single("image"), uploadImage);

// Get all images for the logged-in user
router.get("/", checkToken, getAllImages);

// Toggle favorite status of an image
router.patch("/:imageId/toggleFav", checkToken, FavouritedToggle);

// Download an image
router.get("/:imageId/download", checkToken, downloadImage);

// Delete an image
router.delete("/:imageId", checkToken, deleteImage);

export default router;

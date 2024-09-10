import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import {
  uploadImage,
  getAllImages,
  FavouritedToggle,
  deleteImage,
} from "../controllers/image.controllers.js";
import upload from "../multer/multer.js";

const router = express.Router();

router.get("/getAllImage", checkToken, getAllImages);

router.get("/toggleFav/:imageId", checkToken, FavouritedToggle);

router.get("/deleteImage/:imageId", checkToken, deleteImage);

router.post("/upload", checkToken, upload.single("image"), uploadImage);

export default router;

import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { uploadImage, getAllImages } from "../controllers/image.controllers.js";
import upload from "../multer/multer.js";

const router = express.Router();

router.post("/getAllImage", checkToken, getAllImages);

router.post("/upload", checkToken, upload.single("image"), uploadImage);

export default router;

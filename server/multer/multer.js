import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "piniazoncloud",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: "auto", fetch_format: "auto" },
    ],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image\/(jpg|jpeg|png)$/)) {
      cb(
        new Error("Invalid file format. Only JPG, JPEG, and PNG are allowed."),
        false
      );
    } else {
      cb(null, true);
    }
  },
});

export default upload;

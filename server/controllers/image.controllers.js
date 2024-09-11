import { Image } from "../models/image.models.js";
import cloudinary from "../cloudinary/cloudinary.config.js";
import mongoose from "mongoose";

export const uploadImage = async (req, res) => {
  const { userId } = req;
  const url = req.file?.path;
  const fileName = req.file?.filename;

  if (!url) {
    return res
      .status(400)
      .json({ success: false, message: "Image url not found" });
  }
  try {
    const modifiedUrl = url.replace("/upload/", "/upload/q_auto/f_auto/");

    const image = new Image({
      userId,
      fileName,
      url: modifiedUrl,
      isFavourited: false,
    });

    await image.save();

    res.status(201).json({
      success: true,
      message: "successfully uploaded",
      image,
    });
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Could not upload image. Please try again later.",
    });
  }
};

export const getAllImages = async (req, res) => {
  const { userId } = req;

  try {
    const images = await Image.find({ userId }).sort({ createdAt: -1 });

    if (!images.length) {
      return res.status(404).json({
        success: false,
        message: "No images found for this user.",
        images: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Images retrieved successfully.",
      images,
    });
  } catch (error) {
    console.log("🚀 ~ getAllImages ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Could not retrieve images. Please try again later.",
    });
  }
};

export const FavouritedToggle = async (req, res) => {
  const { userId } = req;
  console.log("🚀 ~ FavouritedToggle ~ userId:", userId);
  const { imageId } = req.params;

  try {
    // Find the image by userId and imageId
    const image = await Image.findOne({ _id: imageId });
    console.log("🚀 ~ FavouritedToggle ~ image:", image);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    if (!image.userId.equals(new mongoose.Types.ObjectId(userId))) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this image.",
      });
    }

    image.isFavourited = !image.isFavourited;

    await image.save();

    res.status(200).json({
      success: true,
      message: "Image favourite status updated successfully.",
      image,
    });
  } catch (error) {
    console.error("Error toggling favourite status:", error);
    res.status(500).json({
      success: false,
      message: "Could not update the image. Please try again later.",
    });
  }
};

export const downloadImage = async (req, res) => {
  const { userId } = req;
  const { imageId } = req.params;
  const { format } = req.query; // 'jpg', 'jpeg', or 'png'

  // Validate requested format
  const validFormats = ["jpg", "jpeg", "png"];
  const selectedFormat = validFormats.includes(format) ? format : "jpg"; // Default to 'jpg' if format is not valid

  try {
    // Find the image by userId and imageId
    const image = await Image.findOne({ _id: imageId });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    if (!image.userId.equals(new mongoose.Types.ObjectId(userId))) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to download this image.",
      });
    }

    // Modify the Cloudinary URL to include the format transformation and provide a downloadable link
    const downloadUrl = image.url.replace(
      "/upload/",
      `/upload/fl_attachment,f_${selectedFormat}/`
    );

    res.status(200).json({
      success: true,
      message: "Image download link generated successfully.",
      downloadUrl,
    });
  } catch (error) {
    console.error("Error generating download link:", error);
    res.status(500).json({
      success: false,
      message: "Could not generate download link. Please try again later.",
    });
  }
};

export const deleteImage = async (req, res) => {
  const { userId } = req;
  const { imageId } = req.params;

  try {
    const image = await Image.findOneAndDelete({ _id: imageId });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    if (!image.userId.equals(new mongoose.Types.ObjectId(userId))) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to modify this image.",
      });
    }

    const publicId = image.fileName;

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Could not delete the image. Please try again later.",
    });
  }
};

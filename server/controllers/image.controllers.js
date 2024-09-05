import { Image } from "../models/image.models.js";

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

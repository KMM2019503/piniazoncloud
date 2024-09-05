import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    isFavourited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);

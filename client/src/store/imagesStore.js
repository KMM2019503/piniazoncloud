import { create } from "zustand";
import toast from "react-hot-toast";

export const useImageStore = create((set) => ({
  images: [],
  isLoading: false,
  isLoadingToggle: false,
  fetchImages: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch("http://localhost:3007/api/images", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in Fetching images");
      }

      const data = await response.json();
      set({ images: data.images });
    } catch (error) {
      console.log("🚀 ~ fetchImages ~ error:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  favToggle: async (imageId) => {
    try {
      set({ isLoadingToggle: true });
      const response = await fetch(
        `http://localhost:3007/api/images/${imageId}/toggleFav`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in Fav Toggle images");
      }

      const data = await response.json();

      set((state) => ({
        images: state.images.map((image) =>
          image._id === imageId ? data.image : image
        ),
      }));
    } catch (error) {
      console.log("🚀 ~ fetchImages ~ error:", error);
    } finally {
      set({ isLoadingToggle: false });
    }
  },
  downloadImage: async (imageId) => {
    try {
      set({ isLoadingToggle: true });
      const response = await fetch(
        `http://localhost:3007/api/images/${imageId}/download`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error in Downloading Photo images"
        );
      }

      // The backend will redirect to the actual Cloudinary download URL
      const data = await response.json();

      window.location.href = data.downloadUrl; // Redirect to the download link to trigger the download
    } catch (error) {
      console.log("🚀 ~ downloadImage: ~ error:", error);
      toast.error("Error downloading image. Please try again.");
    } finally {
      set({ isLoadingToggle: false });
    }
  },
}));

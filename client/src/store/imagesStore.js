import { create } from "zustand";

export const useImageStore = create((set) => ({
  images: [],
  isLoading: false,
  fetchImages: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        "http://localhost:3007/api/images/getAllImage",
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
}));

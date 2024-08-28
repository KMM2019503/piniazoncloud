import { create } from "zustand";

const API_URL = "http://localhost:3007/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  errorMessage: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async ({ email, password, username }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }

      const data = await response.json();
      console.log("🚀 ~ signup: ~ data:", data);

      //   set({ user: data.user, isAuthenticated: true, isLoading: false, message: data.message });
    } catch (error) {
      set({ errorMessage: error.message, isLoading: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  verifyToken: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error verifying email");
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

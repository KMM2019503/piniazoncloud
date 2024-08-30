import toast from "react-hot-toast";
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
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }

      const data = await response.json();
      console.log("🚀 ~ signup: ~ data:", data);

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        message: data.message,
      });
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
        credentials: "include",
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
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error login");
      }

      const data = await response.json();

      toast.success(data.message);

      set({
        user: data.user,
        isAuthenticated: true,
        message: data.message,
      });
      console.log("🚀 ~ login: ~ message:", data.message);
    } catch (error) {
      set({ errorMessage: error.message });
      toast.error(error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error login");
      }

      const data = await response.json();

      toast.success(data.message);

      set({
        user: null,
        isAuthenticated: false,
        message: data.message,
      });
    } catch (error) {
      set({ errorMessage: error.message });
      toast.error(error.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error not Authenticated");
      }
      const data = await response.json();

      toast.success(`Hello, ${data?.user.username}`);

      set({
        user: data.user,
        isAuthenticated: true,
        message: data.message,
      });
    } catch (error) {
      console.log("🚀 ~ checkAuth: ~ error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

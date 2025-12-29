import { UserType } from "@/types/user.types";
import { create } from "zustand";
import { toast } from "react-toastify";
import { userService } from "@/services/userService";

interface userState {
  user: UserType | null;
  users: UserType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  isLoading: boolean;
  error: string;

  setUser: (user: UserType | null) => void;
  fetchUserProfile: (id: string) => void;
  updateUserProfile: (user: UserType) => void;
  fetchUsers: (params?: {
    page?: number;
    limit?: number;
    role?: string;
    username?: string;
  }) => Promise<{
    data: UserType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>;
}

export const useUserStore = create<userState>((set) => ({
  user: null,
  users: [],
  pagination: null,
  isLoading: false,
  error: "",

  setUser: (user) => set({ user }),
  fetchUserProfile: async (id: string) => {
    try {
      set({ isLoading: true });
      const user = await userService.getUserProfile(id);
      set({ user });
    } catch (error) {
      toast(error instanceof Error ? error.message : "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserProfile: async (user: UserType) => {
    try {
      set({ isLoading: true });
      const updatedUser = await userService.updateProfile(user.id!, user);

      if (updatedUser) {
        toast("Updated successfully");
      }
    } catch (error) {
      toast(error instanceof Error ? error.message : "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUsers: async (params) => {
    try {
      set({ isLoading: true });
      const result = await userService.getAllUsers(params);
      set({
        users: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        },
      });
      return result;
    } catch (error) {
      toast(error instanceof Error ? error.message : "An error occurred");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));

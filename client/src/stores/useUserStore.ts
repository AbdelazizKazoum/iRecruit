// import { UserType } from "@/types/user.types";
// import { create } from "zustand";
// import { toast } from "react-toastify";
// import { userService } from "@/services/userService";

// interface userState {
//   user: UserType | null;
//   isLoading: boolean;
//   error: string;

//   setUser: (user: UserType | null) => void;
//   fetchUserProfile: (id: string) => void;
//   updateUserProfile: (user: UserType) => void;
// }

// export const useUserStore = create<userState>((set) => ({
//   user: null,
//   isLoading: false,
//   error: "",

//   setUser: (user) => set({ user }),
//   fetchUserProfile: async (id: string) => {
//     try {
//       set({ isLoading: true });
//       const user = await userService.getUserProfile(id);
//       set({ user });
//     } catch (error) {
//       toast(error.message);
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   updateUserProfile: async (user: UserType) => {
//     try {
//       set({ isLoading: true });
//       const updatedUser = await userService.updateProfile(user.id, user);

//       if (updatedUser) {
//         toast("Updated succefully");
//       }
//     } catch (error) {
//       toast(error.message);
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

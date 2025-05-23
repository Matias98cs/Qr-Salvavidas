import { create } from "zustand";
import { authLogin, authLogout, authProfile, authRefresh } from "@/services/auth/auth.service";
import { AuthProfileResponse, AuthResponse, User } from "@/interfaces/auth.interface";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    password?: string;
    userProfile: AuthProfileResponse | null;

    login: (email: string, password: string) => Promise<{
        success: boolean;
        message?: string;
    }>;
    logout: () => Promise<void>;
    checkStatus: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => void;
    fetchUserProfile: () => Promise<void>;
    setProfile: (profileData: AuthProfileResponse) => Promise<void>;
    resetState: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: "checking",
    token: undefined,
    user: undefined,
    password: undefined,
    userProfile: null,

    changeStatus: (token, user) => {
        if (!token || !user) {
            set({ status: "unauthenticated", token: undefined, user: undefined });
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        } else {
            set({ status: "authenticated", token, user });
            localStorage.setItem("access", token);
        }
    },

    login: async (email, password) => {
        try {
            const response: AuthResponse = await authLogin(email, password);
            get().changeStatus(response.access, response.user);
            return { success: true, message: "Sesión iniciada correctamente!" };
        } catch (error) {
            throw { success: false, message: error };
        }
    },

    logout: async () => {
        try {
            await authLogout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            get().resetState();
        }
    },

    checkStatus: async () => {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
            console.warn("No hay refresh token, cambiando estado a 'unauthenticated'");
            set({ status: "unauthenticated", token: undefined, user: undefined });
            return;
        }

        try {
            const response = await authRefresh(refreshToken);
            set({ token: response.access, status: "authenticated", user: response.user });
        } catch (error) {
            console.error("Error al refrescar el token:", error);
            set({ status: "unauthenticated", token: undefined, user: undefined });
        }
    },

    fetchUserProfile: async () => {
        try {
            const profile = await authProfile();
            set({ userProfile: profile });
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
            set({ userProfile: undefined });
        }
    },

    setProfile: async (profileData: AuthProfileResponse) => {
        set({ userProfile: profileData });
    },

    resetState: () => {
        set({ status: "unauthenticated", token: undefined, user: undefined, userProfile: null });
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    },
}));

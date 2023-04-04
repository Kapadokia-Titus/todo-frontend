import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { axiosInstance } from "../plugins/axios";
import { AxiosResponse } from "axios";

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const isAuthenticated = computed(() => !!token.value);

  const authenticate = async (email: string, password: string) => {
    const { data }: AxiosResponse<AuthResponse> = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );
    token.value = data.token;
    localStorage.setItem("token", data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const { data }: AxiosResponse<AuthResponse> = await axiosInstance.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );
    token.value = data.token;
    localStorage.setItem("token", data.token);
  };

  return {
    isAuthenticated,
    token,
    authenticate,
    register
  };
});

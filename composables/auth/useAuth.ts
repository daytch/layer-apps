import type {
  LoginPayload,
  LoginResponse,
  LoginResponseWithoutToken,
} from "~/types/auth";
import { useAuthUser } from "./useAuthUser";
import { authRepository } from "~/repository/modules/auth";
import { TOAST_ERROR_UI } from "~/constants/ui";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const authRepo = authRepository($api);
  const authUser = useAuthUser();
  const toast = useToast();

  const setUser = (user: LoginResponseWithoutToken) => {
    authUser.value = user;
  };

  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  const login = async (loginPayload: LoginPayload) => {
    try {
      const response = await authRepo.login(loginPayload);
      if (response?.data !== undefined) {
        let tempData = response?.data as LoginResponse;
        setUser(tempData);
      }
    } catch (error: any) {
      toast.add({
        title: error?.data?.message || "",
        ui: { ...TOAST_ERROR_UI },
      });
    }
  };

  return {
    login,
  };
};

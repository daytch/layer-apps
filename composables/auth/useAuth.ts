import type {
  LoginPayload,
  LoginResponse,
  LoginResponseWithoutToken,
} from "~/types/auth";
import { useAuthUser } from "./useAuthUser";
import { authRepository } from "~/repository/modules/auth";
import { useAuthCookie } from "./useAuthCookie";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const authRepo = authRepository($api);
  const authUser = useAuthUser();
  const { setToken } = useAuthCookie();

  const setUser = (user: LoginResponseWithoutToken | null) => {
    authUser.value = user;
  };

  const login = async (loginPayload: LoginPayload) => {
    const response = await authRepo.login(loginPayload);
    if (response?.data !== undefined) {
      let tempData = response?.data as LoginResponse;
      setUser(tempData);
      setToken(tempData.access_token);
      return authUser;
    }
  };

  const me = async () => {
    if (!!authUser.value) return;
    try {
      const data = await authRepo.profile();
      if (data?.data) {
        setUser(data?.data as LoginResponseWithoutToken);
      }
    } catch (error) {
      setToken(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigateTo("/");
  };

  return {
    login,
    me,
    logout,
  };
};

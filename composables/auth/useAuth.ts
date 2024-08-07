import type {
  LoginPayload,
  LoginResponse,
  LoginResponseWithoutToken,
} from "~/types/auth";
import { useAuthUser, type ReturnAuthUser } from "./useAuthUser";
import { authRepository } from "~/repository/modules/auth";
import { useAuthCookie } from "./useAuthCookie";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const authRepo = authRepository($api);
  const authUser = useAuthUser();
  const { setToken } = useAuthCookie();
  const { handleShowToast } = useShowToast();

  const setUser = (userState: ReturnAuthUser) => {
    authUser.value = userState;
  };

  const login = async (loginPayload: LoginPayload) => {
    setUser({
      loading: true,
      error: false,
      user: null,
    });
    try {
      const response = await authRepo.login(loginPayload);
      if (response?.data !== undefined) {
        let tempData = response?.data as LoginResponse;
        setUser({
          loading: false,
          error: false,
          user: tempData,
        });
        setToken(tempData.access_token);
        return authUser;
      }
    } catch (error: any) {
      handleShowToast({ type: "ERROR", message: error?.data?.message });
      setUser({
        loading: false,
        error: true,
        user: null,
      });
    }
  };

  const me = async () => {
    setUser({
      loading: true,
      error: false,
      user: null,
    });
    try {
      const data = await authRepo.profile();
      if (data?.data) {
        setUser({
          loading: false,
          error: false,
          user: data?.data as LoginResponseWithoutToken,
        });
      }
    } catch (error) {
      setToken(null);
      setUser({
        loading: false,
        error: true,
        user: null,
      });
    }
  };

  const logout = () => {
    setUser({ loading: false, error: false, user: null });
    setToken(null);
    navigateTo("/");
  };

  return {
    login,
    me,
    logout,
  };
};

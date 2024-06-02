import type { LoginResponseWithoutToken } from "~/types/auth";

export type ReturnAuthUser = {
  loading: boolean;
  error: boolean;
  user: LoginResponseWithoutToken | null;
};

export const useAuthUser = () => {
  return useState<ReturnAuthUser>("user", () => ({
    loading: false,
    error: false,
    user: null,
  }));
};

import type { LoginResponseWithoutToken } from "~/types/auth";

export const useAuthUser = () => {
  return useState<LoginResponseWithoutToken | null>("user", () => null);
};

import type { LoginPayload, LoginResponse } from "~/types/auth";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";

export const authRepository = <T>(fetch: FetchType<T>) => ({
  async login(payload: LoginPayload): Promise<APIResponse<LoginResponse>> {
    return fetch("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
});

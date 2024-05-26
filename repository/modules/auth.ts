import type {
  LoginPayload,
  LoginResponse,
  LoginResponseWithoutToken,
} from "~/types/auth";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export const authRepository = <T>(fetch: FetchType<T>) => ({
  async login(payload: LoginPayload): Promise<APIResponse<LoginResponse>> {
    return fetch(API_LIST.login, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async profile(): Promise<APIResponse<LoginResponseWithoutToken>> {
    return fetch(API_LIST.profile, {
      method: "GET",
    });
  },
});

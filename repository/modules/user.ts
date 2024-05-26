import type { UserType, CreateUserPayload } from "~/types/user";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export const userRepository = <T>(fetch: FetchType<T>) => ({
  async getAllUsers(): Promise<APIResponse<Array<UserType>>> {
    return fetch(API_LIST.users, {
      method: "GET",
    });
  },
});

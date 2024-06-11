import type {
  UserType,
  CreateUserPayload,
  ResponseCreateUser,
} from "~/types/user";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export type UserRepositoryResponse<T> = Promise<APIResponse<T>>;

export const userRepository = <T>(fetch: FetchType<T>) => ({
  async uploadUserAvatar(file: File): UserRepositoryResponse<{ path: string }> {
    const formData = new FormData();
    formData.append("image", file);
    return fetch(API_LIST.uploadUserAvatar, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  },
  async getAllUsers(): UserRepositoryResponse<Array<UserType>> {
    return fetch(API_LIST.users, {
      method: "GET",
    });
  },
  async createNewUser(
    createUserPayload: CreateUserPayload
  ): UserRepositoryResponse<ResponseCreateUser> {
    return fetch(API_LIST.createUser, {
      method: "POST",
      body: JSON.stringify(createUserPayload),
    });
  },
  async updateUserById(
    id: number,
    updateUserPayload: CreateUserPayload
  ): UserRepositoryResponse<ResponseCreateUser> {
    return fetch(API_LIST.userById(id), {
      method: "PUT",
      body: JSON.stringify(updateUserPayload),
    });
  },
  async deleteUserById(id: number): UserRepositoryResponse<ResponseCreateUser> {
    return fetch(API_LIST.userById(id), {
      method: "DELETE",
    });
  },
});

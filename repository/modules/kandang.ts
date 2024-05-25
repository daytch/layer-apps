import type { KandangType, KandangPayload } from "~/types/kandang";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export const kandangRepository = <T>(fetch: FetchType<T>) => ({
  async getAllKandang(): Promise<APIResponse<Array<KandangType>>> {
    return fetch(API_LIST.allKandang, {
      method: "GET",
    });
  },
  async createKandang(data: KandangPayload): Promise<APIResponse<KandangType>> {
    return fetch(API_LIST.allKandang, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async updateKandang(
    id: number,
    data: KandangPayload
  ): Promise<APIResponse<KandangType>> {
    return fetch(API_LIST.kandangId(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  async deleteKandang(id: number) {
    return fetch(API_LIST.kandangId(id), {
      method: "DELETE",
    });
  },
});

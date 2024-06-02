import type { SOPDataType } from "~/types/sop";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export const sopRepository = <T>(fetch: FetchType<T>) => ({
  async getAllSOPOnRoleId(
    roleId: number
  ): Promise<APIResponse<Array<SOPDataType>>> {
    return fetch(API_LIST.getallsop(roleId), {
      method: "GET",
    });
  },
});

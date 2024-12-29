import type {
  SOPDataType,
  SOPFormPayloadType,
  SOPCompletePayloadType,
  SOPProgressDataType,
  SOPByUserDataType,
} from "~/types/sop";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

type SOPAPIResponse<T> = Promise<APIResponse<T>>;

export const sopRepository = <T>(fetch: FetchType<T>) => ({
  async getAllSOPOnRoleId(roleId: number): SOPAPIResponse<Array<SOPDataType>> {
    return fetch(API_LIST.getallsop(roleId), {
      method: "GET",
    });
  },
  async createNewSOP(payload: SOPFormPayloadType): SOPAPIResponse<SOPDataType> {
    return fetch(API_LIST.singleSOP, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async updateSOPById(
    id: number,
    payload: SOPFormPayloadType
  ): SOPAPIResponse<SOPDataType> {
    return fetch(API_LIST.selectSOPById(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  async deleteSOPById(id: number): SOPAPIResponse<SOPDataType> {
    return fetch(API_LIST.selectSOPById(id), {
      method: "DELETE",
    });
  },
  async completeSOPById(payload: SOPCompletePayloadType): SOPAPIResponse<any> {
    return fetch(API_LIST.completeSOPById, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async checkSOPProgress(
    roleId: number,
    date: string
  ): SOPAPIResponse<Array<SOPProgressDataType>> {
    return fetch(API_LIST.getSOPProggress(roleId, date), {
      method: "GET",
    });
  },
  async getSOPByUser(coopId: string): SOPAPIResponse<Array<SOPByUserDataType>> {
    return fetch(API_LIST.getSopByUser(coopId), { method: "GET" });
  },
  async runSOPScheduler() {
    return fetch("/sop/run-scheduler", { method: "POST" });
  },
});

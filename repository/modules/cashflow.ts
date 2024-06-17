import type {
  CashflowPayloadType,
  ResponseCashflowDataType,
  CashflowUpdateResponseType,
} from "~/types/cashflow";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

export type CashflowResponse<T> = Promise<APIResponse<T>>;

export const cashflowRepository = <T>(fetch: FetchType<T>) => ({
  async getAllCashflow(): CashflowResponse<ResponseCashflowDataType> {
    return fetch(API_LIST.cashflow, {
      method: "GET",
    });
  },
  async createNewCashflow(data: CashflowPayloadType): CashflowResponse<CashflowUpdateResponseType> {
    return fetch(API_LIST.cashflow, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async updateCashflowById(
    id: number,
    data: CashflowPayloadType
  ): CashflowResponse<CashflowUpdateResponseType> {
    return fetch(API_LIST.cashflowById(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  async deleteCashflowById(id: number): CashflowResponse<CashflowUpdateResponseType> {
    return fetch(API_LIST.cashflowById(id), {
      method: "DELETE",
    });
  },
});

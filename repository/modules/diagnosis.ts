import { API_LIST } from "~/constants/api";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import type {
  DiagnosisKandangParams,
  DiagnosisKandangPayload,
  DiagnosisKandangType,
  DiagnosisKandangUpdateRepoonse,
} from "~/types/report";

type DiagnosisKandangAPIResponse<T> = Promise<APIResponse<T>>;

export const diagnosisRepository = <T>(fetch: FetchType<T>) => ({
  async getAllDianosisKandang(
    params?: DiagnosisKandangParams
  ): DiagnosisKandangAPIResponse<Array<DiagnosisKandangType>> {
    return fetch(API_LIST.getAllDiagnosis, {
      params,
      method: "GET",
    });
  },
  async createNewDiagnosisKandang(
    createPayload: DiagnosisKandangPayload
  ): DiagnosisKandangAPIResponse<DiagnosisKandangUpdateRepoonse> {
    return fetch(API_LIST.getAllDiagnosis, {
      method: "POST",
      body: JSON.stringify(createPayload),
    });
  },
  async updateDiagnosisKandangById(
    id: number,
    updatePayload: DiagnosisKandangPayload
  ): DiagnosisKandangAPIResponse<DiagnosisKandangUpdateRepoonse> {
    return fetch(API_LIST.getSingleDiagnosis(id), {
      method: "PUT",
      body: JSON.stringify(updatePayload),
    });
  },
  async deleteDiagnosisKandangById(
    id: number
  ): DiagnosisKandangAPIResponse<DiagnosisKandangUpdateRepoonse> {
    return fetch(API_LIST.getSingleDiagnosis(id), {
      method: "DELETE",
    });
  },
});

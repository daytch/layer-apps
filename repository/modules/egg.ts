import type {
  EggResponseDataType,
  EggUploadDataPayload,
  GetEggParams,
  DuplicateConfirmPayload,
  UpdateRowPayload,
  DeletePayloadEggData,
} from "~/types/egg";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

type EggAPIReponse<T> = Promise<APIResponse<T>>;

export const eggRepository = <T>(fetch: FetchType<T>) => ({
  async uploadEggDataByCoop(
    uploadPayload: EggUploadDataPayload
  ): EggAPIReponse<any> {
    const formData = new FormData();
    formData.append("coopId", uploadPayload.coopId.toString());
    formData.append("file", uploadPayload.file);
    return fetch(API_LIST.uploadEggDataByCoop, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  },
  async getEggDataByCoopAndPeriode(
    params: GetEggParams
  ): EggAPIReponse<Array<EggResponseDataType>> {
    return fetch(API_LIST.getEggDataByCoopAndPeriode, {
      params,
      method: "GET",
    });
  },
  async duplicateConfirm(
    confirmPayload: DuplicateConfirmPayload
  ): EggAPIReponse<any> {
    return fetch(API_LIST.confirmConflictPostEggData, {
      method: "POST",
      body: JSON.stringify(confirmPayload),
    });
  },
  async updateDataRowById(
    updateRowPayload: UpdateRowPayload
  ): EggAPIReponse<any> {
    return fetch(API_LIST.updateEggDataByRowId, {
      method: "POST",
      body: JSON.stringify(updateRowPayload),
    });
  },
  async deleteDataByRowByIds(
    deletePayload: DeletePayloadEggData
  ): EggAPIReponse<any> {
    return fetch(API_LIST.deleteEggDataByIds, {
      method: "POST",
      body: JSON.stringify(deletePayload),
    });
  },
});

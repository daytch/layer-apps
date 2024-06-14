import { API_LIST } from "~/constants/api";
import type { APIResponse } from "~/types/api";
import type { FCRChartDataType, FCRChartParams } from "~/types/fcr-chart";
import type { FetchType } from "~/types/fetch-repo";

export const fcrChartRepository = <T>(fetch: FetchType<T>) => ({
  async getCoopFCRChartByPeriod(
    params: FCRChartParams
  ): Promise<APIResponse<Array<FCRChartDataType>>> {
    return fetch(API_LIST.getFCRChart, {
      method: "GET",
      params: params,
    });
  },
});

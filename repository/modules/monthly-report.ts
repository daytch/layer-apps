import { API_LIST } from "~/constants/api";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import type {
  MonthlyReportDataType,
  MonthlyReportDetailDataType,
} from "~/types/month-report";

type MonthlyReportAPIResponse<T> = Promise<APIResponse<T>>;
type MonthlyReportParams = {
  coopId?: string;
  period?: string;
};

export const monthlyReportRepository = <T>(fetch: FetchType<T>) => ({
  async getAll(
    params: MonthlyReportParams
  ): MonthlyReportAPIResponse<MonthlyReportDataType[]> {
    return fetch(API_LIST.MONTHLY_REPORT.GET_MONTHLY, {
      method: "GET",
      params,
    });
  },
  async getByCoopIDPeriod(
    id: string,
    params: MonthlyReportParams
  ): MonthlyReportAPIResponse<MonthlyReportDetailDataType> {
    return fetch(API_LIST.MONTHLY_REPORT.GET_BY_ID_PERIOD(id), {
      method: "GET",
      params,
    });
  },
  async downloadData(coopId: string, period: string) {
    return fetch(API_LIST.MONTHLY_REPORT.DOWNLOAD_MONTHLY(coopId, period), {
      method: "GET",
    });
  },
});

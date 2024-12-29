import { ASYNC_KEY, MONTHLY_REPORT_DETAIL_KEY } from "~/constants/api";
import { monthlyReportRepository } from "~/repository/modules/monthly-report";
import type { MonthlyReportDataType } from "~/types/month-report";

type UploadMonthlyReportPayload = {
  payload: {
    file: File;
    coopId: number;
    period: string;
  };
  onCloseModal?: () => void;
};

type Params = {
  coopId?: string;
  period?: string;
};

export const useMonthlyReport = () => {
  const { $api } = useNuxtApp();
  const isLoading = ref(false);
  const cookie = useAuthCookie();
  const progress = ref(0);
  const { handleShowToast } = useShowToast();
  const monthlyReportRepo = monthlyReportRepository($api);

  const handleUploadMonthlyReport = ({
    payload,
    onCloseModal = () => {},
  }: UploadMonthlyReportPayload) => {
    isLoading.value = true;
    progress.value = 0;
    const formData = new FormData();
    formData.append("coopId", payload.coopId.toString());
    formData.append("file", payload.file);
    formData.append("period", payload.period);
    const request = new XMLHttpRequest();
    request.open("POST", `${useRuntimeConfig().public.apiUrl}/cashflow/upload`);
    request.setRequestHeader(
      "Authorization",
      `Bearer ${cookie.accessToken.value}`
    );
    request.upload.addEventListener("progress", (e) => {
      const width = ((e.loaded / e.total) * 100).toFixed(2);
      progress.value = Number(width);
    });

    request.addEventListener("load", async (e) => {
      if (request.status === 201) {
        const target = e.target as XMLHttpRequest;
        const jsonResponse = JSON.parse(target?.response || "{}");
        if (jsonResponse?.data?.isAnyDuplicate) {
          isLoading.value = false;
        } else {
          await refreshNuxtData(ASYNC_KEY.MONTHLY_REPORT);
          isLoading.value = false;
          onCloseModal();
          handleShowToast({
            type: "SUCCESS",
            message: "Berhasil menyimpan data.",
          });
        }
      } else {
        handleShowToast({ type: "ERROR", message: "Gagal konfirmasi data." });
        isLoading.value = false;
      }
    });

    request.send(formData);
  };

  const getAllData = async (params: Params) => {
    const response = await monthlyReportRepo.getAll(params);
    if (response?.data) {
      return response?.data;
    }
  };

  const getDetailByCoopPeriod = async (id: string, params: Params) => {
    if (!params?.period?.length || !id?.length) return;
    const response = await monthlyReportRepo.getByCoopIDPeriod(id, params);
    if (response?.data) {
      return response?.data;
    }
  };

  const downloadData = async () => {
    const detailData = localStorage.getItem(MONTHLY_REPORT_DETAIL_KEY);
    if (!detailData) return;
    const parsedData = JSON.parse(detailData) as MonthlyReportDataType;
    if (!parsedData?.coopId || !parsedData?.transDate) return;

    try {
      isLoading.value = true;
      const response = await monthlyReportRepo.downloadData(
        parsedData.coopId?.toString(),
        parsedData?.transDate
      );
      if (response) {
        const blob = URL.createObjectURL(response as any);
        const fileName = `Laporan Bulanan ${formatDate(
          parsedData?.transDate,
          "MMMM yyyy"
        )}.xlsx`;

        const a = document.createElement("a");
        a.href = blob;
        a.download = fileName;
        a.click();
        a.remove();
      }
    } catch {
      handleShowToast({ type: "ERROR", message: "Gagal mengundah data." });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    progress,
    handleUploadMonthlyReport,
    getAllData,
    getDetailByCoopPeriod,
    downloadData,
  };
};

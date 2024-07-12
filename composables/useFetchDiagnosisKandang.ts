import { ASYNC_KEY } from "~/constants/api";
import { diagnosisRepository } from "~/repository/modules/diagnosis";
import type {
  DiagnosisKandangParams,
  DiagnosisKandangPayload,
} from "~/types/report";

export const useFetchDiagnosisKandang = () => {
  const { $api } = useNuxtApp();
  const diagnosisRepo = diagnosisRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { handleShowToast } = useShowToast();

  const initialState = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSucessUpdateData = async (message: string) => {
    handleShowToast({ type: "SUCCESS", message });
    await refreshNuxtData(ASYNC_KEY.DIAGNOSIS_KANDANG);
  };

  const handleErrorUpdateData = (message: string) => {
    handleShowToast({ type: "ERROR", message });
  };

  const getAllDianosisKandang = async (params?: DiagnosisKandangParams) => {
    const response = await diagnosisRepo.getAllDianosisKandang(params);
    if (!!response?.data?.length) {
      return response.data;
    }
  };

  const createNewDiagnosisKandang = async (
    createPayload: DiagnosisKandangPayload
  ) => {
    initialState();
    try {
      const response = await diagnosisRepo.createNewDiagnosisKandang(
        createPayload
      );
      if (!!response?.data) {
        handleSucessUpdateData("Sukses menyimpan diagnosis data.");
        await refreshNuxtData(ASYNC_KEY.NOTIFICATION);
        return response.data;
      }
    } catch (error) {
      handleErrorUpdateData("Gagal menyimpan diagnosis data.");
    }
  };

  const updateDiagnosisKandangById = async (
    id: number,
    updatePayload: DiagnosisKandangPayload
  ) => {
    initialState();
    try {
      const response = await diagnosisRepo.updateDiagnosisKandangById(
        id,
        updatePayload
      );
      if (!!response.data) {
        handleSucessUpdateData("Sukses memperbarui diagnosis data.");
        await refreshNuxtData(ASYNC_KEY.NOTIFICATION);
        return response.data;
      }
    } catch (error) {
      handleErrorUpdateData("Gagal memperbarui diagnosis data.");
    }
  };

  const deleteDiagnosisKandangById = async (id: number) => {};

  return {
    getAllDianosisKandang,
    isLoading,
    isError,
    deleteDiagnosisKandangById,
    createNewDiagnosisKandang,
    updateDiagnosisKandangById,
  };
};

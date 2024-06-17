import { ASYNC_KEY } from "~/constants/api";
import { cashflowRepository } from "~/repository/modules/cashflow";
import type { CashflowPayloadType } from "~/types/cashflow";

export const useFetchCashflow = () => {
  const { $api } = useNuxtApp();
  const cashflowRepo = cashflowRepository($api);
  const { handleShowToast } = useShowToast();
  const isLoading = ref(false);
  const isError = ref(false);

  const initialState = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSucessUpdateCashflowData = async (message: string) => {
    handleShowToast({ type: "SUCCESS", message });
    await refreshNuxtData(ASYNC_KEY.cashflow);
  };

  const handleErrorUpdateCashflowData = (message: string) => {
    handleShowToast({ type: "SUCCESS", message });
  };

  const handleCreateNewCashflow = async (createPayload: CashflowPayloadType) => {
    initialState();
    try {
      const response = await cashflowRepo.createNewCashflow(createPayload);
      if (!!response?.data) {
        handleSucessUpdateCashflowData("Berhasil menambahkan data cashflow.");
        return response.data;
      }
    } catch (error) {
      handleErrorUpdateCashflowData("Gagal menambahkan data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  const handleUpdateCashflowById = async (id: number, updatePayload: CashflowPayloadType) => {
    initialState();
    try {
      const response = await cashflowRepo.updateCashflowById(id, updatePayload);
      if (!!response?.data) {
        handleSucessUpdateCashflowData("Berhasil mengubah data cashflow.");
        return response.data;
      }
    } catch (error) {
      handleErrorUpdateCashflowData("Gagal mengubah data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  const handleDeleteCashflow = async (id: number) => {
    initialState();
    try {
      const response = await cashflowRepo.deleteCashflowById(id);
      if (!!response?.data) {
        handleSucessUpdateCashflowData("Berhasil menghapus data cashflow.");
        return response.data;
      }
    } catch (error) {
      handleErrorUpdateCashflowData("Gagal menghapus data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  const getAllCashflows = async () => {
    const response = await cashflowRepo.getAllCashflow();
    if (!!response?.data) {
      return response?.data;
    }
  };

  return {
    isLoading,
    isError,
    getAllCashflows,
    handleCreateNewCashflow,
    handleUpdateCashflowById,
    handleDeleteCashflow,
  };
};

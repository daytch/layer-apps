import { ASYNC_KEY } from "~/constants/api";
import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";
import { cashflowRepository } from "~/repository/modules/cashflow";
import type { CashflowDataType, CashflowPayloadType } from "~/types/cashflow";

export const useFetchCashflow = () => {
  const { $api } = useNuxtApp();
  const cashflowRepo = cashflowRepository($api);
  const toast = useToast();
  const { data: cashflows } = useNuxtData<Array<CashflowDataType>>(
    ASYNC_KEY.cashflow
  );
  const previousCashflows = ref<any>([]);
  const isLoading = ref(false);
  const isError = ref(false);

  const initialState = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSuccess = (successData: {
    successResponseData: CashflowDataType;
    message: string;
    type: "REPLACE" | "REMOVE" | "ADD";
  }) => {
    const { message, successResponseData, type } = successData;
    if (type === "REMOVE") {
      cashflows.value = (cashflows.value || [])?.filter(
        (cashflow) => cashflow.id !== successResponseData.id
      );
    } else if (type === "REPLACE") {
      cashflows.value = (cashflows.value || [])?.map((cashflow) =>
        cashflow.id === successResponseData.id ? successResponseData : cashflow
      );
    } else {
      (cashflows.value || []).pop();
      (cashflows.value || []).push(successResponseData);
    }
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_SUCCESS_UI,
      },
    });
  };

  const handleError = (message: string) => {
    isError.value = true;
    cashflows.value = previousCashflows.value;
    previousCashflows.value = [];
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const getAllCashflows = async () => {
    const response = await cashflowRepo.getAllCashflow();
    if (!!response?.data) {
      return response?.data;
    }
  };

  const createNewCashflow = async (
    createCashflowPayload: CashflowPayloadType
  ) => {
    initialState();
    const temporarayCashflow: CashflowDataType = {
      ...createCashflowPayload,
      id: new Date().getTime(),
    };
    previousCashflows.value = cashflows.value;
    cashflows.value?.push(temporarayCashflow);
    try {
      const response = await cashflowRepo.createNewCashflow(
        createCashflowPayload
      );
      if (!!response?.data) {
        handleSuccess({
          message: "Berhasil menyimpan data cashflow.",
          successResponseData: response.data,
          type: "ADD",
        });
      }
    } catch (error) {
      handleError("Gagal menyimpan data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  const updateCashflowById = async (
    id: number,
    updateCashflowByIdPayload: CashflowPayloadType
  ) => {
    initialState();
    const temporarayCashflow: CashflowDataType = {
      ...updateCashflowByIdPayload,
      id,
    };
    previousCashflows.value = cashflows.value;
    cashflows.value = cashflows.value?.map((cashflow) =>
      cashflow.id === id ? { ...cashflow, ...temporarayCashflow } : cashflow
    ) as any;
    try {
      const response = await cashflowRepo.updateCashflowById(
        id,
        updateCashflowByIdPayload
      );
      if (!!response?.data) {
        handleSuccess({
          message: "Berhasil meyimpan data cashflow.",
          type: "REPLACE",
          successResponseData: response?.data,
        });
      }
    } catch (error) {
      handleError("Gagal menyimpan data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  const handleDeleteCashflowById = async (id: number) => {
    initialState();
    previousCashflows.value = cashflows.value;
    cashflows.value =
      cashflows.value?.filter((cashflow) => cashflow.id !== id) || [];
    try {
      const response = await cashflowRepo.deleteCashflowById(id);
      if (!!response?.data) {
        handleSuccess({
          message: "Berhasil menghapus data cashflow.",
          type: "REMOVE",
          successResponseData: response?.data,
        });
      }
    } catch (error) {
      handleError("Gagal menghapus data cashflow.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isError,
    getAllCashflows,
    createNewCashflow,
    handleDeleteCashflowById,
  };
};

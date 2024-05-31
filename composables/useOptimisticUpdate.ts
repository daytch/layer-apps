import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";

export const useOptimisticUpdate = <T extends { id: number }>(
  storageKey: string
) => {
  const isLoading = ref(false);
  const isError = ref(false);
  const { data } = useNuxtData<Array<T>>(storageKey);
  const previousData = ref<any>([]);
  const toast = useToast();

  const initialFetching = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleRemoveData = (successResponseData: T) => {
    data.value = (data.value || [])?.filter(
      (item) => item.id !== successResponseData.id
    );
  };

  const handleReplaceData = (successResponseData: T) => {
    data.value = (data.value || [])?.map((item) =>
      item.id === successResponseData.id ? successResponseData : item
    );
  };

  const handleAddData = (successResponseData: T) => {
    (data.value || []).pop();
    (data.value || []).push(successResponseData);
  };

  const handleSuccess = (successData: {
    successResponseData: T;
    message: string;
    type: "REPLACE" | "REMOVE" | "ADD";
  }) => {
    const { message, successResponseData, type } = successData;
    if (type === "REMOVE") {
      handleRemoveData(successResponseData);
    } else if (type === "REPLACE") {
      handleReplaceData(successResponseData);
    } else {
      handleAddData(successResponseData);
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
    data.value = previousData.value;
    previousData.value = [];
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  return {
    isLoading,
    isError,
    initialFetching,
    handleError,
    handleSuccess,
    previousData,
    data,
  };
};

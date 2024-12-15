export const useOptimisticUpdate = <T extends { id: number }>(
  storageKey: string
) => {
  const isLoading = ref(false);
  const isError = ref(false);
  const { data } = useNuxtData<Array<T>>(storageKey);
  const previousData = ref<any>([]);
  const { handleShowToast } = useShowToast();

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
    handleShowToast({ type: "SUCCESS", message });
  };

  const handleError = (message: string) => {
    isError.value = true;
    data.value = previousData.value;
    previousData.value = [];
    handleShowToast({ type: "ERROR", message });
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

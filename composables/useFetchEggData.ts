import { ASYNC_KEY } from "~/constants/api";
import { eggRepository } from "~/repository/modules/egg";
import type {
  DeletePayloadEggData,
  EggResponseDataType,
  EggUploadDataPayload,
  GetEggParams,
  UpdateRowPayload,
} from "~/types/egg";

export const useFetchEggData = () => {
  const { $api } = useNuxtApp();
  const eggRepo = eggRepository($api);
  const { handleShowToast } = useShowToast();
  const isLoading = ref(false);
  const isError = ref(false);
  const selectedItems = ref<Array<number>>([]);
  const { data: currentData } = useNuxtData<Array<EggResponseDataType>>(
    ASYNC_KEY.EGG_DATA
  );

  const initialFetch = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const getEggDataByCoopAndPeriode = async (params: GetEggParams) => {
    if (!params.coopId) return;
    const response = await eggRepo.getEggDataByCoopAndPeriode(params);
    if (!!response?.data?.length) {
      return response.data;
    }
  };

  const uploadEggDataByCoop = async (uploadPayload: EggUploadDataPayload) => {
    initialFetch();
    try {
      const response = await eggRepo.uploadEggDataByCoop(uploadPayload);
      if (!!response?.data) {
        return response;
      }
    } catch (error) {
      handleShowToast({ type: "ERROR", message: "Gagal mengunggah dokumen." });
      isError.value = true;
      return error;
    } finally {
      isLoading.value = false;
    }
  };

  const updateEggDataByRowId = async (updateRowPayload: UpdateRowPayload) => {
    initialFetch();
    try {
      const response = await eggRepo.updateDataRowById(updateRowPayload);
      if (!!response?.data) {
        await refreshNuxtData(ASYNC_KEY.EGG_DATA);
        handleShowToast({ type: "SUCCESS", message: "Berhasil merubah data." });
        return response?.data;
      }
    } catch (error) {
      handleShowToast({ type: "ERROR", message: "Gagal merubah data." });
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteDataByRowByIds = async (deletePayload: DeletePayloadEggData) => {
    initialFetch();
    try {
      const response = await eggRepo.deleteDataByRowByIds(deletePayload);
      if (!!response?.data) {
        await refreshNuxtData(ASYNC_KEY.EGG_DATA);
        handleShowToast({
          type: "SUCCESS",
          message: "Berhasil menghapus data.",
        });
        return response?.data;
      }
    } catch (error) {
      handleShowToast({ type: "ERROR", message: "Gagal menghapus data." });
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const checkAll = computed({
    get() {
      return (
        selectedItems.value?.length > 0 &&
        selectedItems.value?.length === currentData?.value?.length
      );
    },
    set() {
      const alreadyCheckedAll =
        selectedItems.value?.length > 0 &&
        selectedItems.value?.length === currentData?.value?.length;
      selectedItems.value = alreadyCheckedAll
        ? []
        : (currentData?.value || [])?.map((item) => item.id);
    },
  });

  return {
    isLoading,
    selectedItems,
    checkAll,
    uploadEggDataByCoop,
    getEggDataByCoopAndPeriode,
    updateEggDataByRowId,
    deleteDataByRowByIds,
  };
};

import { eggRepository } from "~/repository/modules/egg";
import type { EggUploadDataPayload } from "~/types/egg";

export const useFetchEggData = () => {
  const { $api } = useNuxtApp();
  const eggRepo = eggRepository($api);
  const { handleShowToast } = useShowToast();
  const isLoading = ref(false);
  const isError = ref(false);

  const initialFetch = () => {
    isLoading.value = true;
    isError.value = false;
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

  return {
    isLoading,
    uploadEggDataByCoop,
  };
};

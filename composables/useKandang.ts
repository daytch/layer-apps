import { ASYNC_KEY } from "~/constants/api";
import { TOAST_SUCCESS_UI, TOAST_ERROR_UI } from "~/constants/ui";
import { kandangRepository } from "~/repository/modules/kandang";
import type { KandangType, KandangPayload } from "~/types/kandang";

export const useKandang = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const kandangRepo = kandangRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { data: kandangs } = useNuxtData<Array<KandangType>>(ASYNC_KEY.kandang);
  const previousKandans = ref<any>([]);

  const initialFetch = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSuccess = async (message: string) => {
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_SUCCESS_UI,
      },
    });
    await refreshNuxtData(ASYNC_KEY.kandang);
  };

  const handleError = (message: string) => {
    isError.value = true;
    kandangs.value = previousKandans.value;
    previousKandans.value = [];
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const createKandang = async (payload: KandangPayload) => {
    initialFetch();
    const now = new Date();
    let tempData: KandangType = {
      ...payload,
      id: now.getTime(),
      updateAt: now.toDateString(),
      createdAt: now.toDateString(),
      nik: payload.code,
    };
    previousKandans.value = kandangs.value;
    kandangs.value?.push(tempData);
    try {
      const data = await kandangRepo.createKandang(payload);
      if (data?.data) {
        handleSuccess("Sukses menyimpan data kandang.");
      }
    } catch (error) {
      handleError("Gagal menyimpan data kandang.");
    } finally {
      isLoading.value = false;
    }
  };

  const updateSelectedKandang = async (id: number, data: KandangPayload) => {
    initialFetch();
    previousKandans.value = kandangs.value;
    kandangs.value = kandangs.value?.map((kandang) =>
      kandang.id === id ? { ...kandang, ...data } : kandang
    ) as any;
    try {
      const response = await kandangRepo.updateKandang(id, data);
      if (response?.data?.id) {
        handleSuccess("Sukses mengubah data kandang.");
      }
    } catch {
      handleError("Gagal mengubah data kandang.");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteKandang = async (id: number) => {
    initialFetch();
    previousKandans.value = kandangs.value;
    kandangs.value = (kandangs.value?.filter((kandang) => kandang.id !== id) ||
      undefined) as any;
    try {
      const response = await kandangRepo.deleteKandang(id);
      if (response) {
        handleSuccess("Sukses menghapus data kandang.");
      }
    } catch (error) {
      handleError("Gagal menyimpan data kandang.");
    } finally {
      isLoading.value = false;
    }
  };

  const getAllKandang = async () => {
    const data = await kandangRepo.getAllKandang();
    return data?.data;
  };

  return {
    isError,
    isLoading,
    getAllKandang,
    updateSelectedKandang,
    createKandang,
    deleteKandang,
  };
};

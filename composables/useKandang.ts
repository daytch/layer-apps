import { ASYNC_KEY } from "~/constants/api";
import { kandangRepository } from "~/repository/modules/kandang";
import type { KandangType, KandangPayload } from "~/types/kandang";

export const useKandang = () => {
  const { $api } = useNuxtApp();
  const { handleShowToast } = useShowToast();
  const kandangRepo = kandangRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { data: kandangs } = useNuxtData<Array<KandangType>>(ASYNC_KEY.kandang);
  const { data: kandangOptions } = useNuxtData<
    Array<{ label: string; value: number }>
  >(ASYNC_KEY.KANDANG_OPTIONS);
  const previousKandans = ref<any>([]);
  const authuser = useAuthUser();

  const initialFetch = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSuccess = async (message: string) => {
    handleShowToast({ type: "SUCCESS", message });
    await refreshNuxtData(ASYNC_KEY.kandang);
  };

  const handleError = (message: string) => {
    isError.value = true;
    kandangs.value = previousKandans.value;
    previousKandans.value = [];
    handleShowToast({ type: "ERROR", message });
  };

  const getKandangOptions = async () => {
    if (!!authuser.value?.user && !!authuser.value?.user?.coops?.length) {
      return authuser.value?.user?.coops?.map((c) => ({
        label: c?.coop_name,
        value: c?.coopId,
      }));
    }
    if (!!kandangs.value?.length) {
      return kandangs.value.map((k) => ({ label: k.name, value: k.id }));
    }
    if (!!kandangOptions.value?.length) {
      return kandangOptions.value;
    }
    const response = await getAllKandang();
    return !!response?.length
      ? response.map((r) => ({ label: r.name, value: r.id }))
      : [];
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
      handleError(
        (error as any)?.data?.message || "Gagal menyimpan data kandang."
      );
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
    } catch (error) {
      handleError(
        (error as any)?.data?.message || "Gagal mengubah data kandang."
      );
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
      handleError(
        (error as any)?.data?.message || "Gagal menyimpan data kandang."
      );
    } finally {
      isLoading.value = false;
    }
  };

  const getAllKandang = async () => {
    const data = await kandangRepo.getAllKandang();
    const kandangData = data?.data;
    if (!!kandangData?.length) {
      kandangOptions.value = kandangData.map((k) => ({
        label: k.name,
        value: k.id,
      }));
    }
    return kandangData;
  };

  return {
    isError,
    isLoading,
    getAllKandang,
    updateSelectedKandang,
    createKandang,
    deleteKandang,
    getKandangOptions,
  };
};

import { ASYNC_KEY } from "~/constants/api";
import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";
import { sopRepository } from "~/repository/modules/sop";
import type { SOPDataType } from "~/types/sop";

export const useFetchSOP = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const sopRepo = sopRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { data: sops } = useNuxtData<Array<SOPDataType>>(ASYNC_KEY.sop);
  const previousSops = ref<any>([]);

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
    sops.value = previousSops.value;
    previousSops.value = [];
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const getAllSopsByRoleId = async (roleId: number | undefined) => {
    if (!roleId) return;
    const response = await sopRepo.getAllSOPOnRoleId(roleId);
    if (response?.data) {
      return response?.data;
    }
  };

  return {
    isLoading,
    isError,
    getAllSopsByRoleId,
  };
};

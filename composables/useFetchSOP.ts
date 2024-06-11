import { ASYNC_KEY } from "~/constants/api";
import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";
import { sopRepository } from "~/repository/modules/sop";
import type {
  SOPDataType,
  SOPFormPayloadType,
  SOPCompletePayloadType,
} from "~/types/sop";
import { ROLES_OPTIONS_FORM } from "~/constants/role";

const items = [
  {
    label: "Mandor",
    content: "",
  },
  {
    label: "Anak Kandang",
    content: "",
  },
];

export const useFetchSOP = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const sopRepo = sopRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { data: sopsAnakKandang } = useNuxtData(ASYNC_KEY.SOP_ANAK_KANDANG);
  const { data: sopsMandor } = useNuxtData(ASYNC_KEY.SOP_MANDOR);
  const previousSops = ref<Array<any> | undefined>(undefined);
  const { selectedTab } = useAdminSOP(items);

  const initialFetch = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const ROLE = {
    0: "Mandor",
    1: "Anak Kandang",
  };

  const handleSuccess = async (message: string) => {
    const index = selectedTab.value as keyof typeof ROLE;
    const roleType = ROLE[index];

    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_SUCCESS_UI,
      },
    });

    roleType === "Anak Kandang"
      ? await refreshNuxtData(ASYNC_KEY.SOP_ANAK_KANDANG)
      : await refreshNuxtData(ASYNC_KEY.SOP_MANDOR);
  };

  const handleError = (message: string) => {
    isError.value = true;
    const index = selectedTab.value as keyof typeof ROLE;
    const roleType = ROLE[index];
    roleType === "Anak Kandang"
      ? (sopsAnakKandang.value = previousSops.value || [])
      : (sopsMandor.value = previousSops.value || []);
    previousSops.value = undefined;
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

  const checkSOPProgress = async (roleId: number, date?: string) => {
    if (!roleId) return;
    initialFetch();
    const response = await sopRepo.checkSOPProgress(roleId, date || "");
    if (!!response?.data) {
      return response?.data;
    }
  };

  const submitFormData = async ({
    id,
    roleName,
    roleId,
    ...restPayload
  }: { id?: number; roleName: string } & SOPFormPayloadType) => {
    const isUpdateMode = id !== undefined;
    initialFetch();
    console.log(selectedTab.value);
    try {
      const response = isUpdateMode
        ? await sopRepo.updateSOPById(id, { ...restPayload, roleId })
        : await sopRepo.createNewSOP({ ...restPayload, roleId });
      if (!!response?.data) {
        handleSuccess(
          `Berhasil ${isUpdateMode ? "mengubah" : "menyimpan"} data.`
        );
      }
    } catch (error) {
      handleError(`Gagal ${isUpdateMode ? "mengubah" : "menyimpan"} data.`);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteSOPById = async ({ id }: SOPDataType) => {
    initialFetch();
    try {
      const response = await sopRepo.deleteSOPById(id);
      if (!!response?.data) {
        handleSuccess("Sukses menghapus data.");
      }
    } catch (error) {
      handleError("Gagal menghapus data.");
    } finally {
      isLoading.value = false;
    }
  };

  const completeSOPById = async (completePayload: SOPCompletePayloadType) => {
    initialFetch();
    try {
      const response = await sopRepo.completeSOPById(completePayload);
      if (!!response?.data) {
        handleSuccess("Sukses menyimpan laporan.");
        return response;
      }
    } catch (error) {
      handleError("Gagal menyimpan laporan.");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isError,
    getAllSopsByRoleId,
    submitFormData,
    deleteSOPById,
    checkSOPProgress,
    completeSOPById,
  };
};

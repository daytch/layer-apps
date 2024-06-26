import { API_LIST, ASYNC_KEY } from "~/constants/api";
import { eggRepository } from "~/repository/modules/egg";
import type { EggUploadDataPayload, UploadEggResponse } from "~/types/egg";

type DuplicateDateState = {
  code: string;
  duplicateDates: Array<string>;
};

const _useUploadEggData = () => {
  const { $api } = useNuxtApp();
  const isLoading = ref(false);
  const showModal = ref(false);
  const cookie = useAuthCookie();
  const formStep = ref<"UPLOAD" | "DUPLICATE-CONFIRM">("UPLOAD");
  const duplicateDateState = ref<DuplicateDateState>({
    code: "",
    duplicateDates: [],
  });
  const progress = ref(0);
  const eggRepo = eggRepository($api);
  const { handleShowToast } = useShowToast();

  const duplicateDateMessage = computed(() => {
    if (duplicateDateState.value.duplicateDates?.length < 5) {
      return duplicateDateState.value.duplicateDates;
    } else {
      return duplicateDateState.value.duplicateDates
        .slice(0, 5)
        .map((item, index) => (index === 4 ? `${item}...` : item));
    }
  });

  const handleUploadEggDataByCoop = (uploadPayload: EggUploadDataPayload) => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append("coopId", uploadPayload.coopId.toString());
    formData.append("file", uploadPayload.file);
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `${useRuntimeConfig().public.apiUrl}${API_LIST.uploadEggDataByCoop}`
    );
    request.setRequestHeader(
      "Authorization",
      `Bearer ${cookie.accessToken.value}`
    );
    request.upload.addEventListener("progress", (e) => {
      const width = ((e.loaded / e.total) * 100).toFixed(2);
      progress.value = Number(width);
    });

    request.addEventListener("load", (e) => {
      if (request.status === 201) {
        const target = e.target as XMLHttpRequest;
        const jsonResponse = JSON.parse(target?.response || "{}");
        if (jsonResponse?.data?.isAnyDuplicate) {
          console.log("haha", jsonResponse);
          duplicateDateState.value = {
            code: jsonResponse?.data?.code || "",
            duplicateDates:
              jsonResponse?.data?.duplicateDate?.slice(0, 6) || [],
          };
          formStep.value = "DUPLICATE-CONFIRM";
          isLoading.value = false;
        } else {
          console.log(jsonResponse);
        }
      } else {
        console.log("test");
      }
    });

    request.send(formData);
  };

  const handleConfirmDuplicateEggData = async (status: number) => {
    if (
      !duplicateDateState.value.code?.length ||
      !duplicateDateState.value?.duplicateDates?.length
    )
      return;
    try {
      const response = await eggRepo.duplicateConfirm({
        status,
        code: duplicateDateState.value.code,
      });
      if (response?.statusCode === 201) {
        await refreshNuxtData(ASYNC_KEY.EGG_DATA);
        isLoading.value = false;
        showModal.value = false;
        duplicateDateState.value = {
          code: "",
          duplicateDates: [],
        };
        handleShowToast({
          type: "SUCCESS",
          message: response?.message || "Berhasil menyimpan data.",
        });
      }
    } catch (error) {
      handleShowToast({ type: "ERROR", message: "Gagal konfirmasi data." });
    }
  };

  return {
    isLoading,
    progress,
    showModal,
    duplicateDateMessage,
    formStep,
    handleUploadEggDataByCoop,
    handleConfirmDuplicateEggData,
  };
};

export const useUploadEggData = createSharedComposable(_useUploadEggData);

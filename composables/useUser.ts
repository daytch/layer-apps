import { ASYNC_KEY } from "~/constants/api";
import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";
import { userRepository } from "~/repository/modules/user";
import type { CreateUserPayload, FormSubmitType } from "~/types/user";

export const useUser = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const userRepo = userRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);

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
    await refreshNuxtData(ASYNC_KEY.user);
  };

  const handleError = (message: string) => {
    isError.value = true;
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const uploadUserAvatar = (file: File) => userRepo.uploadUserAvatar(file);

  const getAllUsers = async () => {
    const response = await userRepo.getAllUsers();
    if (response?.data) {
      return response?.data;
    }
  };

  const deleteUserById = async (id: number) => {
    initialFetch();
    try {
      const response = await userRepo.deleteUserById(id);
      if (!!response?.data) {
        handleSuccess("Berhasil menghapus data user.");
      }
    } catch (error) {
      handleError("Gagal menghapus data user.");
    } finally {
      isLoading.value = false;
    }
  };

  const updateUserById = async (
    id: number,
    updateUserPayload: CreateUserPayload
  ) => {
    initialFetch();
    try {
      const response = await userRepo.updateUserById(id, updateUserPayload);
      if (!!response?.data) {
        handleSuccess("Berhasil mengubah data user.");
      }
    } catch (error) {
      handleError("Gagal mengubah data user.");
    } finally {
      isLoading.value = false;
    }
  };

  const createNewUser = async (createUserPayload: CreateUserPayload) => {
    initialFetch();
    try {
      const response = await userRepo.createNewUser(createUserPayload);
      if (!!response?.data) {
        handleSuccess("Berhasil menyimpan data user.");
      }
    } catch (error) {
      handleError("Gagal menyimpan data user.");
    } finally {
      isLoading.value = false;
    }
  };

  const submitFormUser = async ({
    name,
    password,
    file,
    id,
    isUpdateMode,
    coopId,
    roleId,
    email,
    phone,
  }: FormSubmitType) => {
    initialFetch();
    const parsingPayload: CreateUserPayload = {
      name,
      coopId,
      roleId,
      email,
      phone,
    };
    if (!isUpdateMode || (isUpdateMode && !!password?.length)) {
      parsingPayload["password"] = password;
    }
    if (!!file) {
      uploadUserAvatar(file)
        .then((response) => {
          const data = response?.data;
          if (!!data?.path?.length) {
            parsingPayload["avatar"] = data?.path;
          }
          id !== undefined
            ? updateUserById(id, parsingPayload)
            : createNewUser(parsingPayload);
        })
        .catch(() => {
          handleError("Gagal mengupload avatar.");
          isLoading.value = false;
        });
    } else {
      id !== undefined
        ? updateUserById(id, parsingPayload)
        : createNewUser(parsingPayload);
    }
  };

  return {
    getAllUsers,
    isLoading,
    isError,
    deleteUserById,
    submitFormUser,
  };
};

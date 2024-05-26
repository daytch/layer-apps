import { ASYNC_KEY } from "~/constants/api";
import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";
import { userRepository } from "~/repository/modules/user";
import type { UserType } from "~/types/user";

export const useUser = () => {
  const { $api } = useNuxtApp();
  const toast = useToast();
  const userRepo = userRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);
  const { data: users } = useNuxtData<Array<UserType>>(ASYNC_KEY.user);
  const previousUsers = ref<any>([]);

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
    users.value = previousUsers.value;
    previousUsers.value = [];
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const getAllUsers = async () => {
    const response = await userRepo.getAllUsers();
    if (response?.data) {
      return response?.data;
    }
  };

  return {
    getAllUsers,
    isLoading,
    isError,
  };
};

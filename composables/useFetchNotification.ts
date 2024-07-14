import { ASYNC_KEY } from "~/constants/api";
import { notificationRepository } from "~/repository/modules/notification";
import type { NotificationDataType } from "~/types/notification";

type CacheNotificationData = {
  data: NotificationDataType[];
  isNotReadAll: boolean;
};

export const useFetchNotification = () => {
  const isLoading = ref(false);
  const isError = ref(false);
  const { handleShowToast } = useShowToast();
  const { $api } = useNuxtApp();
  const notifRepo = notificationRepository($api);
  const router = useRouter();
  const { data } = useNuxtData<CacheNotificationData | null>(
    ASYNC_KEY.NOTIFICATION
  );
  const previousData = ref<CacheNotificationData | null>(null);

  const initialFetching = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const getAllNotifications = async (): Promise<
    CacheNotificationData | undefined
  > => {
    try {
      const response = await notifRepo.getAllNotification();
      if (response?.data) {
        return {
          data: response.data,
          isNotReadAll: !!response?.data?.filter((d) => !d.isRead)?.length,
        };
      }
    } catch (error) {}
  };

  const handleMarkAsDone = async (id: number) => {
    previousData.value = data.value;
    const notificationUpdatedCache = (data?.value?.data || []).map((d) =>
      d.id === id ? { ...d, isRead: true } : d
    );
    data.value = {
      data: notificationUpdatedCache,
      isNotReadAll: !!notificationUpdatedCache?.filter((d) => !d.isRead)
        ?.length,
    };
    initialFetching();
    try {
      const response = await notifRepo.markNotificationAsDone(id);
      if (!!response?.data) {
        handleShowToast({
          type: "SUCCESS",
          message: "Berhasil memperbarui data.",
        });
        router.push("/dashboard/diagnosis-kandang");
      }
    } catch (error) {
      data.value = previousData.value;
      previousData.value = null;
      isError.value = true;
      handleShowToast({ type: "ERROR", message: "Gagal memperbarui data." });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isError,
    getAllNotifications,
    handleMarkAsDone,
  };
};

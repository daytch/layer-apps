import { API_LIST } from "~/constants/api";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import type { NotificationDataType } from "~/types/notification";

type NotificationResponse<T> = Promise<APIResponse<T>>;

export const notificationRepository = <T>(fetch: FetchType<T>) => ({
  async getAllNotification(): NotificationResponse<
    Array<NotificationDataType>
  > {
    return fetch(API_LIST.NOTIFICATION.GET, {
      method: "GET",
    });
  },
  async markNotificationAsDone(
    id: number
  ): NotificationResponse<NotificationDataType> {
    return fetch(API_LIST.NOTIFICATION.MARK_DONE(id), {
      method: "PUT",
    });
  },
});

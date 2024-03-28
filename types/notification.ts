type NotificationStatus = "READ" | "UNREAD";

export type AppNotification = {
  sender: string;
  text: string;
  status: NotificationStatus;
};

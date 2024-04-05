import type { RoleType } from "./dashboard-menu";

export type UserStatus = "ACTIVE" | "INACTIVE";

export type User = {
  avatar?: string;
  name: string;
  id: string;
  phoneNumber: string;
  role: RoleType;
  status: UserStatus;
};

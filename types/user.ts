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

export type UserType = {
  email: string;
  id: number;
  avatar: null | string;
  nik: string;
  name: string;
  phone: string;
  is_active: boolean;
  role_name: string;
  coops: Array<{ coopId: number; coop_name: string }>;
};

export type CreateUserPayload = {
  password?: string;
  name?: string;
  roleId?: number;
  coopId?: string[];
  email?: string;
  phone?: string;
  avatar?: string;
};

export type ResponseCreateUser = {
  password: string;
  roleId: number;
  coopId: number;
  createdAt: string;
  updateAt: string;
} & UserType;

export type FormSubmitType = {
  id?: number;
  isUpdateMode?: boolean;
  file: File | null;
} & CreateUserPayload;

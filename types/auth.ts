export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  nik: string;
  name: string;
  roleId: number;
  coopId: number;
  email: string;
  phone: string;
  avatar: string | null;
  is_active: boolean;
  access_token: string;
  role_name: string;
  coops: Array<{ coopId: number; coop_name: string }>;
};

export type LoginResponseWithoutToken = Omit<LoginResponse, "access_token">;

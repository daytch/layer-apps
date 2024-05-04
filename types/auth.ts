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
  avatar: null | string;
  is_active: boolean;
  access_token: string;
};

export type LoginResponseWithoutToken = Omit<LoginResponse, "access_token">;

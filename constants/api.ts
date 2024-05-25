export const API_LIST = {
  login: "/auth/login",
  profile: "/auth/profile",
  allKandang: "/coop",
  kandangId: (id: number) => `/coop/${id}`,
  users: "/users",
  createUser: "/users/register",
  user: (id: number) => `/users/${id}`,
};

export const ASYNC_KEY = {
  kandang: "kandang",
  user: "user",
};

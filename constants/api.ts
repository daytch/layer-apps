export const API_LIST = {
  login: "/auth/login",
  profile: "/auth/profile",
  allKandang: "/coop",
  kandangId: (id: number) => `/coop/${id}`,
  users: "/users",
  createUser: "/users/register",
  userById: (id: number) => `/users/${id}`,
  getallsop: (roleId: number) => `/sop/getallsop?roleId=${roleId}`,
  cashflow: "/cashflow",
  cashflowById: (cashflowId: number) => `/cashflow/${cashflowId}`,
  foodMedicineStock: "/obat",
  foodMedicineById: (id: number) => `/obat/${id}`,
};

export const ASYNC_KEY = {
  kandang: "kandang",
  user: "user",
  sop: "sop",
  cashflow: "cashflow",
  foodMedicine: "food-medicine",
};

export const API_LIST = {
  login: "/auth/login",
  profile: "/auth/profile",
  allKandang: "/coop",
  kandangId: (id: number) => `/coop/${id}`,
  uploadUserAvatar: "/users/upload",
  users: "/users",
  createUser: "/users/register",
  userById: (id: number) => `/users/${id}`,
  cashflow: "/cashflow",
  cashflowById: (cashflowId: number) => `/cashflow/${cashflowId}`,
  foodMedicineStock: "/obat",
  foodMedicineById: (id: number) => `/obat/${id}`,
  getallsop: (roleId: number) => `/sop/getallsop?roleId=${roleId}`,
  getSopByRoleId: (roleId: number) => `/sop/${roleId}`,
  singleSOP: `/sop`,
  selectSOPById: (id: number) => `/sop/${id}`,
  completeSOPById: "/sop/complete",
  getSOPProggress: (roleId: number, date: string) =>
    `/sop/progress/${roleId}/${date}`,
};

export const ASYNC_KEY = {
  kandang: "kandang",
  user: "user",
  SOP_MANDOR: "sop-mandor",
  SOP_ANAK_KANDANG: "sop-anak-kandang",
  cashflow: "cashflow",
  foodMedicine: "food-medicine",
  sopProgress: (roleId: number, date?: string) =>
    `progress-sop-${roleId}-${date || ""}`,
};

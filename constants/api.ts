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
  getSOPProggress: (roleId: number, date: string) => `/sop/progress/${roleId}/${date}`,
  getSopByUser: "/sop/getsopbyuser",
  getFCRChart: "/dashboard/FCRChart",
  getAllDiagnosis: "/diagnostic",
  getSingleDiagnosis: (id: number) => `/diagnostic/${id}`,
  uploadEggDataByCoop: "/egg/upload",
  downloadEggDataByCoopAndDate: (coopId: number, date: string) => `/egg/download/${coopId}/${date}`,
  confirmConflictPostEggData: "/egg/duplicate-confirm",
  downloadEggDataByCoopAndData: "/egg",
  deleteEggDataByIds: "/egg/delete",
  getEggDataByCoopAndPeriode: "/egg",
};

export const ASYNC_KEY = {
  kandang: "kandang",
  KANDANG_OPTIONS: "kandang-options",
  user: "user",
  USER_OPTIONS: "user-options",
  SOP_MANDOR: "sop-mandor",
  SOP_ANAK_KANDANG: "sop-anak-kandang",
  SOP_BY_USER: "sop-by-user",
  cashflow: "cashflow",
  foodMedicine: "food-medicine",
  sopProgress: (roleId: number, date?: string) => `progress-sop-${roleId}-${date || ""}`,
  DIAGNOSIS_KANDANG: "diagnosis-kandang",
  FCR_CHART: "fcr-chart",
  EGG_DATA: "egg_data",
};

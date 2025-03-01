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
  getSopByUser: (coopId: string) => `/sop/getsopbyuser/${coopId}`,
  getFCRChart: "/dashboard/FCRChart",
  getAllDiagnosis: "/diagnostic",
  getSingleDiagnosis: (id: number) => `/diagnostic/${id}`,
  uploadEggDataByCoop: "/egg/upload",
  downloadEggDataByCoopAndDate: (coopId: number, date: string) =>
    `/egg/download/${coopId}/${date}`,
  confirmConflictPostEggData: "/egg/duplicate-confirm",
  downloadEggDataByCoopAndData: "/egg",
  deleteEggDataByIds: "/egg/delete",
  getEggDataByCoopAndPeriode: "/egg",
  updateEggDataByRowId: "/egg/update",
  NOTIFICATION: {
    GET: "/notification",
    MARK_DONE: (id: number) => `/notification/${id}`,
  },
  MEDIC: {
    GET_HISTORY: "/obat/usage-history",
  },
  MONTHLY_REPORT: {
    GET_MONTHLY: "/cashflow/report-income",
    GET_BY_ID_PERIOD: (id: string) => `/cashflow/report/${id}`,
    DOWNLOAD_MONTHLY: (id: string, period: string) =>
      `/cashflow/download/${id}/${period}`,
  },
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
  sopProgress: (roleId: number, date?: string) =>
    `progress-sop-${roleId}-${date || ""}`,
  DIAGNOSIS_KANDANG: "diagnosis-kandang",
  FCR_CHART: "fcr-chart",
  EGG_DATA: "egg_data",
  NOTIFICATION: "egg_notification",
  FOOD_MEDIC_HISTORY: "food_medic_history",
  MONTHLY_REPORT: "monthly_report",
};

export const MONTHLY_REPORT_DETAIL_KEY = "MONTHLY_REPORT_DETAIL_KEY";

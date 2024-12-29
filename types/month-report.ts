export type MonthlyReportDataType = {
  id: number;
  coopId: number;
  nik: string;
  name: string;
  transDate: string;
  totalIncome: number;
  totalExpenses: number;
  netincome: number;
  period: string | null;
};

export type MonthlyReportDetailDataType = {
  id: number;
  coopId: number;
  transDate: string;
  jenis: string;
  qty: number;
  indexs: number;
  totalIncome: null | number;
  eggNotes: null | number;
  kilo: null | number;
  price: null | number;
  totalExpenses: number;
  createdAt: string;
  updatedAt: string;
};

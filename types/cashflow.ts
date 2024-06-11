export type CashflowType = "DEBIT" | "KREDIT";

export type CashflowDataType = {
  id: number;
  periode: string;
  trans_date: string;
  tipe: string;
  nominal: number;
  total: number;
};

export type ResponseCashflowDataType = {
  cashflow: Array<CashflowDataType>;
  total: number;
};

export type CashflowPayloadType = {
  periode: string;
  trans_date: string;
  tipe: CashflowType;
  nominal: number;
  total: number;
};

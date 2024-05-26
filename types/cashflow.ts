export type CashflowType = "DEBIT" | "KREDIT";

export type CashflowDataType = {
  id: number;
  periode: string;
  trans_date: string;
  tipe: CashflowType;
  nominal: number;
  total: number;
};

export type CashflowPayloadType = {
  periode: string;
  trans_date: string;
  tipe: CashflowType;
  nominal: number;
  total: number;
};

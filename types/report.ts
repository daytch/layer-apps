export type DiagnosisKandangType = {
  id: number;
  coop_id: string | number;
  coop_name: string;
  reporter: string;
  trans_date: string;
  disease: string;
  medicine: string | null;
  dose: number | null;
  progres: string | null;
};

export type DiagnosisKandangPayload = {
  coopId?: number;
  transDate?: string;
  disease?: string;
  reporterId?: number;
  medicineId?: number;
  dose?: number;
  status?: string;
};

export type DiagnosisKandangParams = {
  from?: string;
  to?: string;
  userId?: number;
};

export type DiagnosisKandangUpdateRepoonse = {
  id: number;
  coopId: number;
  transDate: string;
  disease: string;
  medicineId: number | null;
  dose: number | null;
  status: string | null;
  reporterId: number;
  createdAt: string;
  updateAt: string;
};

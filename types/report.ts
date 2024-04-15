export type DiagnosisKandang = {
  id: string;
  cageID: string;
  cageName: string;
  date: Date | string;
  reporter: string;
  diseaseHistory: string;
  medicationAdministered: string;
  doses?: number;
  progress: "HANDLED" | "UNHANDLED";
};

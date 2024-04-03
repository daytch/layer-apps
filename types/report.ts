export type DiagnosisKandang = {
  id: string;
  cageID: string;
  cageName: string;
  date: Date | string;
  reporter: string;
  diseaseHistory: string;
  medicationAdministered: string;
  progress: "HANDLED" | "UNHANDLED";
};

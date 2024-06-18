export type EggUploadDataPayload = {
  file: File;
  coopId: number;
};

export type GetEggParams = {
  coopId: number;
  period?: string;
};

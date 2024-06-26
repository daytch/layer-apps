export type EggUploadDataPayload = {
  file: File;
  coopId: number;
};

export type GetEggParams = {
  coopId?: number;
  period?: string;
};

export type EggResponseDataType = {
  id: number;
  coopId: number;
  transDate: string;
  ageInDay: number;
  ageInWeek: number;
  pop: number;
  m: any;
  afk: any;
  sell: any;
  finalPop: number;
  feedType: any;
  feedWeight: any;
  feedFIT: any;
  prodPieceN: any;
  prodPieceP: any;
  prodPieceBS: any;
  prodTotalPiece: any;
  prodWeightN: any;
  prodWeightP: any;
  prodWeightBS: any;
  prodTotalWeight: any;
  HD: any;
  FCR: any;
  EggWeight: any;
  EggMass: any;
  OVK: any;
  createdAt: string;
  updateAt: string;
};

export type UpdateRowFormType = {
  type: "number" | "date" | "string";
  value: number | string;
  id: number;
  key: string;
};

type EggDuplicateResponse = {
  statusCode: number;
  message: string;
  data: {
    isAnyDuplicate: boolean;
    duplicateDate: Array<string>;
    code: string;
  };
};

export type UploadEggResponse = EggDuplicateResponse;

export type DuplicateConfirmPayload = {
  code: string;
  status: number;
};

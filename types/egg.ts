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

export type Kandang = {
  cageName: string;
  cageId: string;
  address: string;
};

export type KandangType = {
  id: number;
  name: string;
  nik: string;
  address: string;
  createdAt: string;
  updateAt: string;
};

export type KandangPayload = {
  name: string;
  code: string;
  address: string;
};

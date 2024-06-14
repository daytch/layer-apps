export type FCRChartDataType = {
  transDate: string;
  FCR: number;
};

export type FCRChartParams = {
  coopId: number | undefined;
  period?: string;
};

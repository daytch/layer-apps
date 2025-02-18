export type FoodMedicineStock = {
  id: string;
  cageName: string;
  itemName: string;
  itemID: string;
  pricePerItem: number;
  quantityItem: number;
  createdDate: Date | string;
};

export type FoodMedicineStockType = {
  id: number;
  SKU: string;
  coopId: number;
  name: string;
  userId: number;
  quantity: number;
  uom: string;
  price: number;
  createdAt: string;
  updateAt: string;
  coop_name: string;
  isEatable: boolean;
};

export type FoodMedicineStockPayloadType = {
  name: string;
  SKU: string;
  coopId: number;
  userId: number;
  quantity: number;
  price: number;
  uom: string;
  isEatable: boolean;
};

export type FoodMedicineHistory = {
  sku: string;
  pic: string;
  transaction_date: string;
  medicine: string;
  tipe: string;
  qty: number;
  total: number;
  coopId: number;
};

export type FoodMedicineHistoryParams = {
  coop_id: number;
  start_date?: string;
  end_date?: string;
};

export type FeedDropdownSOPDataType = {
  id: number;
  coopId: number;
  name: string;
  quantity: number;
};

export type FeedMedicConsumptionPayloadType = {
  coopId: number;
  feedId: number;
  total: number;
  transDate: string;
};

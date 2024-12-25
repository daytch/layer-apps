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
};

export type FoodMedicineStockPayloadType = {
  name: string;
  SKU: string;
  coopId: number;
  userId: number;
  quantity: number;
  price: number;
  uom: string;
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
  start_date: string;
  end_date: string;
  coop_id: number;
};

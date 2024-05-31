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
  total: number;
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
  total: number;
  uom: string;
};

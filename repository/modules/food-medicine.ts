import type {
  FoodMedicineHistory,
  FoodMedicineHistoryParams,
  FoodMedicineStockPayloadType,
  FoodMedicineStockType,
} from "~/types/food-medicine-stock";
import type { APIResponse } from "~/types/api";
import type { FetchType } from "~/types/fetch-repo";
import { API_LIST } from "~/constants/api";

type FoodMedicineStockResponse<T> = Promise<APIResponse<T>>;

export const foodMedicineRepository = <T>(fetch: FetchType<T>) => ({
  async getAllFoodMedicineStock(): FoodMedicineStockResponse<
    Array<FoodMedicineStockType>
  > {
    return fetch(API_LIST.foodMedicineStock, { method: "GET" });
  },

  async createFoodMedicineStock(
    createPayload: FoodMedicineStockPayloadType
  ): FoodMedicineStockResponse<FoodMedicineStockType> {
    return fetch(API_LIST.foodMedicineStock, {
      method: "POST",
      body: JSON.stringify(createPayload),
    });
  },

  async updateFoodMedicineStokById(
    id: number,
    updatePayload: FoodMedicineStockPayloadType
  ): FoodMedicineStockResponse<FoodMedicineStockType> {
    return fetch(API_LIST.foodMedicineById(id), {
      method: "PUT",
      body: JSON.stringify(updatePayload),
    });
  },

  async deleteFoodMedicineStockById(
    id: number
  ): FoodMedicineStockResponse<FoodMedicineStockType> {
    return fetch(API_LIST.foodMedicineById(id), {
      method: "DELETE",
    });
  },

  async getFoodMedicHistory(
    params: FoodMedicineHistoryParams
  ): FoodMedicineStockResponse<Array<FoodMedicineHistory>> {
    return fetch(API_LIST.MEDIC.GET_HISTORY, { params, method: "GET" });
  },
});

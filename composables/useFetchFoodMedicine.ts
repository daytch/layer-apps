import { ASYNC_KEY } from "~/constants/api";
import { foodMedicineRepository } from "~/repository/modules/food-medicine";
import type {
  FoodMedicineStockPayloadType,
  FoodMedicineStockType,
} from "~/types/food-medicine-stock";

type ExtedFormMedicalStockPayloadType = FoodMedicineStockPayloadType & {
  coop_name: string;
};

export const useFetchFoodMedicine = () => {
  const { $api } = useNuxtApp();
  const foodMedicineRepo = foodMedicineRepository($api);
  const {
    isLoading,
    handleError,
    handleSuccess,
    initialFetching,
    previousData,
    data,
  } = useOptimisticUpdate<FoodMedicineStockType>(ASYNC_KEY.foodMedicine);

  const getAllFoodMedicineStock = async () => {
    const response = await foodMedicineRepo.getAllFoodMedicineStock();
    if (!!response?.data) {
      return response?.data;
    }
  };

  const createNewStock = async (
    createPayload: ExtedFormMedicalStockPayloadType
  ) => {
    initialFetching();
    const payload = {
      ...createPayload,
    } as Partial<ExtedFormMedicalStockPayloadType>;
    delete payload.coop_name;
    const now = new Date();
    const temporaryData: FoodMedicineStockType = {
      ...createPayload,
      id: now.getTime(),
      updateAt: now.toDateString(),
      createdAt: now.toDateString(),
    };
    previousData.value = data.value;
    data.value?.push(temporaryData);
    try {
      const response = await foodMedicineRepo.createFoodMedicineStock(
        payload as FoodMedicineStockPayloadType
      );
      if (!!response?.data) {
        handleSuccess({
          type: "ADD",
          message: "Data berhasil ditambahkan",
          successResponseData: response?.data,
        });
      }
    } catch (error) {
      handleError("Data gagal ditambahkan");
    } finally {
      isLoading.value = false;
    }
  };

  const updateStockById = async (
    id: number,
    updatePayload: ExtedFormMedicalStockPayloadType
  ) => {
    initialFetching();
    const payload = {
      ...updatePayload,
    } as Partial<ExtedFormMedicalStockPayloadType>;
    delete payload.coop_name;
    const now = new Date();
    const temporaryData: FoodMedicineStockType = {
      ...updatePayload,
      id,
      updateAt: now.toDateString(),
      createdAt: now.toDateString(),
    };
    previousData.value = data.value;
    data.value = data.value?.map((item) =>
      item.id === id ? { ...item, ...temporaryData } : item
    ) as any;
    try {
      const response = await foodMedicineRepo.updateFoodMedicineStokById(
        id,
        payload as FoodMedicineStockPayloadType
      );
      if (!!response?.data) {
        handleSuccess({
          type: "REPLACE",
          message: "Sukses menyimpan data",
          successResponseData: response?.data,
        });
      }
    } catch (error) {
      handleError("Data gagal disimpan");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteStockById = async (id: number) => {
    initialFetching();
    previousData.value = data.value;
    data.value = data?.value?.filter((item) => item?.id !== id) || [];
    try {
      const response = await foodMedicineRepo.deleteFoodMedicineStockById(id);
      if (!!response.data) {
        handleSuccess({
          message: "Data berhasil dihapus",
          type: "REMOVE",
          successResponseData: response?.data || {},
        });
      }
    } catch (error) {
      handleError("Gagal menghapus data.");
    } finally {
      isLoading.value = false;
    }
  };
  return {
    getAllFoodMedicineStock,
    deleteStockById,
    createNewStock,
    updateStockById,
    isLoading,
  };
};

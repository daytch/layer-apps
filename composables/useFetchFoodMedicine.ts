import { ASYNC_KEY } from "~/constants/api";
import { foodMedicineRepository } from "~/repository/modules/food-medicine";
import type {
  FeedMedicConsumptionPayloadType,
  FoodMedicineHistoryParams,
  FoodMedicineStockPayloadType,
  FoodMedicineStockType,
} from "~/types/food-medicine-stock";

type ExtedFormMedicalStockPayloadType = FoodMedicineStockPayloadType & {
  coop_name: string;
};

export const useFetchFoodMedicine = () => {
  const { $api } = useNuxtApp();
  const { handleShowToast } = useShowToast();
  const foodMedicineRepo = foodMedicineRepository($api);
  const isLoading = ref(false);
  const isError = ref(false);

  const initialFetching = () => {
    isLoading.value = true;
    isError.value = false;
  };

  const handleSuccess = async (message: string) => {
    handleShowToast({ type: "SUCCESS", message });
    await refreshNuxtData(ASYNC_KEY.foodMedicine);
  };

  const handleError = (message: string) => {
    isError.value = true;
    handleShowToast({ type: "ERROR", message });
  };

  const getAllFoodMedicineStock = async (params?: { coopId: string }) => {
    const response = await foodMedicineRepo.getAllFoodMedicineStock(params);
    if (!!response?.data) {
      return response?.data;
    }
  };

  const getFeedDropdownSOP = async (params?: { coopId: string }) => {
    if (!params || !params?.coopId?.length) return;
    const response = await foodMedicineRepo.getFeedDropdownSOP(params);
    if (!!response?.data) {
      return response?.data;
    }
  };

  const getFoodMedicHistory = async (params?: FoodMedicineHistoryParams) => {
    const response = await foodMedicineRepo.getFoodMedicHistory(params);
    if (!!response.data) {
      return {
        data: response.data || [],
        total: {
          transactionTotal: response?.data?.reduce((prev, currentValue) => {
            return prev + currentValue?.total;
          }, 0),
          qytTotal: response?.data?.reduce((prev, current) => {
            return prev + current.qty;
          }, 0),
        },
      };
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

    try {
      const response = await foodMedicineRepo.createFoodMedicineStock(
        payload as FoodMedicineStockPayloadType
      );
      if (!!response?.data) {
        handleSuccess("Data berhasil ditambahkan");
      }
    } catch (error) {
      handleError((error as any)?.data?.message || "Data gagal ditambahkan");
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

    try {
      const response = await foodMedicineRepo.updateFoodMedicineStokById(
        id,
        payload as FoodMedicineStockPayloadType
      );
      if (!!response?.data) {
        handleSuccess("Sukses menyimpan data");
      }
    } catch (error) {
      handleError((error as any)?.data?.message || "Data gagal disimpan");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteStockById = async (id: number) => {
    initialFetching();

    try {
      const response = await foodMedicineRepo.deleteFoodMedicineStockById(id);
      if (!!response.data) {
        handleSuccess("Data berhasil dihapus");
      }
    } catch (error) {
      handleError((error as any)?.data?.message || "Gagal menghapus data.");
    } finally {
      isLoading.value = false;
    }
  };

  const createNewConsumptionStock = async (
    createPayload: FeedMedicConsumptionPayloadType
  ) => {
    initialFetching();
    foodMedicineRepo
      .createFeedComsumption(createPayload)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        handleError(error?.data?.message || "Data gagal ditambahkan");
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    getAllFoodMedicineStock,
    deleteStockById,
    createNewStock,
    updateStockById,
    isLoading,
    getFoodMedicHistory,
    getFeedDropdownSOP,
    createNewConsumptionStock,
  };
};

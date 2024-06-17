<script setup lang="ts">
import type {
  FoodMedicineStockPayloadType,
  FoodMedicineStockType,
} from "~/types/food-medicine-stock";
import { ASYNC_KEY } from "~/constants/api";

const { getAllFoodMedicineStock, isLoading, createNewStock, updateStockById } =
  useFetchFoodMedicine();
const { data, pending } = await useAsyncData(
  ASYNC_KEY.foodMedicine,
  async () => getAllFoodMedicineStock(),
  {
    lazy: true,
  }
);
const { showModal, handleShowModal, handleCloseModal, selectedItem } =
  useModalForm<FoodMedicineStockType>();

const handleSubmitStockForm = (
  formStockPayload: FoodMedicineStockPayloadType & { coop_name: string }
) => {
  if (!!selectedItem.value?.id) {
    updateStockById(selectedItem.value.id, formStockPayload);
  } else {
    createNewStock(formStockPayload);
  }
  handleCloseModal();
  selectedItem.value = undefined;
};
</script>

<template>
  <FoodMedicineTableFilter
    :show-add-button="true"
    :add-button-text="'Tambah Data'"
    @handle-add-data="() => handleShowModal(undefined)"
  />
  <FoodMedicineStockTable
    :items="data || []"
    :loading="pending"
    @handle-select-update-food="(item) => handleShowModal(item)"
  />
  <AppModal v-model="showModal">
    <FoodMedicineForm
      :default-value="selectedItem"
      :is-submitting="isLoading"
      @handle-add-stock="handleSubmitStockForm"
      @handle-hide-modal="handleCloseModal"
    />
  </AppModal>
</template>

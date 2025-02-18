<script setup lang="ts">
import type { FeedMedicConsumptionPayloadType } from "~/types/food-medicine-stock";

const { showModal, handleShowModal, handleCloseModal } = useModalForm<any>();
const { isLoading, createNewConsumptionStock } = useFetchFoodMedicine();

const handleAddNewData = async (payload: FeedMedicConsumptionPayloadType) => {
  createNewConsumptionStock(payload).then(() => {
    handleCloseModal();
  });
};
</script>

<template>
  <FoodMedicineTableFilter
    :show-add-button="false"
    :add-button-text="'Tambah Data'"
    @handle-add-data="() => handleShowModal(undefined)"
  />
  <UsageHistoryTable />
  <AppModal v-model="showModal">
    <UsageHistoryForm
      @handle-close-modal="handleCloseModal"
      :is-loading="isLoading"
      @handle-add-report="handleAddNewData"
    />
  </AppModal>
</template>

<script setup lang="ts">
import { UI_PRIMARY_BUTTON_STYLES, UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";
import type { CashflowDataType, CashflowPayloadType } from "~/types/cashflow";

defineProps<{
  items: Array<CashflowDataType>;
  loading?: boolean;
  total: number;
}>();
const { isLoading, handleCreateNewCashflow, handleUpdateCashflowById } = useFetchCashflow();
const {
  showModal: showCashflowModal,
  handleCloseModal,
  handleShowModal,
  selectedItem: selectedCashflowItem,
} = useModalForm<CashflowDataType>();

const handleSubmitForm = (payload: CashflowPayloadType) => {
  if (!!selectedCashflowItem.value?.id) {
    handleUpdateCashflowById(selectedCashflowItem.value.id, payload).then((data) => {
      if (data?.id) {
        handleCloseModal();
      }
    });
  } else {
    handleCreateNewCashflow(payload).then((data) => {
      if (data?.id) {
        handleCloseModal();
      }
    });
  }
};
</script>

<template>
  <div class="mt-8 bg-white py-[18px] px-4 rounded-lg border border-[--app-gray-400] w-full">
    <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
      <UButton
        @click="handleShowModal(undefined)"
        type="button"
        icon="i-heroicons-plus"
        size="md"
        :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
      >
        Tambah Data
      </UButton>
      <!-- <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
        <Datepicker :range="true" v-model:model-value="range" />
        <UButton
          type="button"
          size="md"
          color="primary"
          variant="ghost"
          :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
        >
          Tampilkan
        </UButton>
      </div> -->
    </div>
  </div>
  <CashflowTable
    :items="items"
    :loading="loading"
    @handle-show-update-modal="
      (item) => {
        handleShowModal(item);
      }
    "
  />
  <AppModal v-model="showCashflowModal">
    <CashflowForm
      :default-value="selectedCashflowItem"
      @handle-close-modal="handleCloseModal"
      :total-cashflow-value="total"
      @handle-success-add-cashflow="handleSubmitForm"
      :is-loading="isLoading"
    />
  </AppModal>
</template>

<script setup lang="ts">
import type { CashflowDataType } from "~/types/cashflow";

defineProps<{
  items: Array<CashflowDataType>;
  loading?: boolean;
}>();

const {
  showModal: showCashflowModal,
  handleCloseModal,
  handleShowModal,
  selectedItem: selectedCashflowItem,
} = useModalForm<CashflowDataType>();
const range = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);
</script>

<template>
  <div
    class="mt-8 bg-white py-[18px] px-4 rounded-lg border border-[--app-gray-400] w-full"
  >
    <div class="flex flex-col sm:flex-row sm:justify-between gap-4">
      <UButton
        @click="handleShowModal(undefined)"
        type="button"
        icon="i-heroicons-plus"
        size="md"
        :ui="{
          strategy: 'override',
          base: '',
          padding: {
            md: 'py-[10px] px-4',
          },
          color: {
            primary: {
              solid:
                'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
            },
          },
        }"
      >
        Tambah Data
      </UButton>
      <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
        <Datepicker :range="true" v-model:model-value="range" />
        <UButton
          type="button"
          size="md"
          :ui="{
            strategy: 'override',
            base: '',
            padding: {
              md: 'py-[10px] px-4',
            },
            color: {
              primary: {
                solid:
                  'bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
              },
            },
          }"
        >
          Tampilkan
        </UButton>
      </div>
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
      @handle-success-add-cashflow="(item) => console.log(item)"
    />
  </AppModal>
</template>

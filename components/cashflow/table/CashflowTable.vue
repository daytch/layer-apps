<script setup lang="ts">
import type { CashflowDataType } from "~/types/cashflow";

defineProps<{
  items: Array<CashflowDataType>;
  loading?: boolean;
}>();

defineEmits<{
  (e: "handleShowUpdateModal", item: CashflowDataType): void;
}>();

const { handleDeleteCashflowById, isLoading } = useFetchCashflow();
const showDeleteConfirmModal = ref(false);
const selectedCashflow = ref<CashflowDataType | undefined>(undefined);

const handleDeleteCashflow = async () => {
  if (!!selectedCashflow.value?.id) {
    showDeleteConfirmModal.value = false;
    await handleDeleteCashflowById(selectedCashflow.value.id);
  }
  selectedCashflow.value = undefined;
};
</script>

<template>
  <div class="w-full mt-[14px] overflow-x-auto bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          >
            Tanggal
          </th>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          >
            Periode
          </th>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          >
            Tipe
          </th>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          >
            Jumlah
          </th>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          >
            Total Saldo
          </th>
          <th
            class="bg-white py-[18px] px-4 text-base font-medium text-[--app-dark-100] text-left"
          ></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr class="border-b border-b-[--app-gray-500]">
            <td
              :colspan="6"
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              <LoadingSpinner />
            </td>
          </tr>
        </template>
        <template v-else-if="!loading && !!items?.length">
          <tr class="border-b border-b-[--app-gray-500]" v-for="item in items">
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              {{ formatDate(item?.trans_date, "dd MMMM yyyy") }}
            </td>
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              {{ formatDate(item?.periode, "MMMM yyyy") }}
            </td>
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px] text-[--app-dark-100] uppercase"
            >
              {{ item?.tipe }}
            </td>
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px]"
              :class="
                (item?.nominal || 0) > 50000
                  ? 'text-[--app-blue-100]'
                  : 'text-[--app-danger-300]'
              "
            >
              {{ formatMoney(item?.nominal || 0) }}
            </td>
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px] text-[--app-dark-100] uppercase"
            >
              {{ formatMoney(item?.total || 0) }}
            </td>
            <td
              class="p-4 bg-white text-left text-sm font-normal leading-[22px] text-[--app-dark-100] uppercase"
            >
              <div class="flex items-center space-x-5">
                <button
                  type="button"
                  @click="$emit('handleShowUpdateModal', item)"
                >
                  <IconPencilUpdate :width="24" :height="24" />
                </button>
                <button
                  type="button"
                  @click="
                    () => [
                      (selectedCashflow = item),
                      (showDeleteConfirmModal = true),
                    ]
                  "
                >
                  <IconTrash :width="24" :height="24" />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="6">
              <NoDataStatus>Data Cashflow Tidak Ditemukan</NoDataStatus>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    title="Hapus Cashflow"
    v-model="showDeleteConfirmModal"
    @handle-confirm-delete="handleDeleteCashflow"
    :is-loading="isLoading"
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus periode:<br />
        {{ formatDate(selectedCashflow?.periode || "", "MMMM yyyy") }}
      </p>
    </template>
  </DeleteConfirmModal>
</template>

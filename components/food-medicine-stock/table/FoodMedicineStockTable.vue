<script setup lang="ts">
import type { FoodMedicineStockType } from "~/types/food-medicine-stock";

type ColumnKey = keyof FoodMedicineStockType;

type Column = {
  key: ColumnKey | "";
  label: string;
};
const columns: Array<Column> = [
  {
    key: "coop_name",
    label: "Nama Kandang",
  },
  {
    key: "SKU",
    label: "SKU Barang",
  },
  {
    key: "name",
    label: "Nama Barang",
  },
  {
    key: "price",
    label: "Harga Per Satuan",
  },
  {
    key: "uom",
    label: "Nama Satuan",
  },
  {
    key: "quantity",
    label: "Jumlah Barang",
  },
  {
    key: "total",
    label: "Total Barang",
  },
  {
    key: "",
    label: "",
  },
];

defineProps<{
  items: Array<FoodMedicineStockType>;
  loading?: boolean;
}>();

defineEmits<{
  (e: "handleSelectUpdateFood", item: FoodMedicineStockType): void;
}>();

const { deleteStockById, isLoading } = useFetchFoodMedicine();
const selectedItem = ref<FoodMedicineStockType | null>(null);
const showDeleteModal = ref(false);

const handleDeleteStock = async () => {
  if (!selectedItem.value) return;
  await deleteStockById(selectedItem.value.id);
  selectedItem.value = null;
  showDeleteModal.value = false;
};
</script>

<template>
  <div class="w-full overflow-auto bg-white mt-8">
    <table class="food-medicine-stock-table w-full">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            class="whitespace-nowrap text-left text-base font-medium leading-6 text-[#1D2433] py-[18px] px-4"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <td
            :colspan="columns.length"
            class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
          >
            <LoadingSpinner />
          </td>
        </template>
        <template v-else-if="!loading && !!items.length">
          <tr v-for="item in items" class="border-b">
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.coop_name }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.SKU }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.name }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ formatMoney(item?.price) }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.uom }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.quantity }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item?.total }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              <div class="flex items-center space-x-5">
                <button
                  type="button"
                  @click="$emit('handleSelectUpdateFood', item)"
                >
                  <IconPencilUpdate />
                </button>
                <button
                  type="button"
                  @click="
                    () => {
                      selectedItem = item;
                      showDeleteModal = true;
                    }
                  "
                >
                  <IconTrash />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <td :colspan="columns.length">
            <NoDataStatus>Data Tidak Ditemukan</NoDataStatus>
          </td>
        </template>
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    title="Hapus Data Stok"
    v-model="showDeleteModal"
    @handle-confirm-delete="handleDeleteStock"
    :is-loading="isLoading"
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus :<br />
        {{ selectedItem?.name }} - {{ selectedItem?.SKU }} ?
      </p>
    </template>
  </DeleteConfirmModal>
</template>

<style>
.food-medicine-stock-table tbody tr:nth-child(odd) {
  @apply bg-white;
}
.food-medicine-stock-table tbody tr:nth-child(even) {
  @apply bg-[#F8F9FC];
}
.food-medicine-stock-table td {
  @apply text-[#1D2433];
}
</style>

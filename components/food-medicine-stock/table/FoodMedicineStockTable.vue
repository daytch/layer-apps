<script setup lang="ts">
import type { FoodMedicineStock } from "~/types/food-medicine-stock";

//  id: "1",
//     itemID: "G10000000851",
//     cageName: "Kandang Jatisari",
//     itemName: "Stres Block",
//     pricePerItem: 50000,
//     quantityItem: 10,

type ColumnKey = keyof FoodMedicineStock;

type Column = {
  key: ColumnKey;
  label: string;
};
const columns: Array<Column> = [
  {
    key: "createdDate",
    label: "Tanggal",
  },
  {
    key: "cageName",
    label: "Nama Kandang",
  },
  {
    key: "itemID",
    label: "ID Barang",
  },
  {
    key: "itemName",
    label: "Nama Barang",
  },
  {
    key: "pricePerItem",
    label: "Harga Per Satuan",
  },
  {
    key: "quantityItem",
    label: "Jumlah Item",
  },
];

const props = defineProps<{
  items: Array<FoodMedicineStock>;
}>();
</script>

<template>
  <UTable
    :rows="
      items.map((item) => ({
        ...item,
        createdDate: formatDate(item.createdDate, 'dd MMM yyyy'),
        pricePerItem: formatMoney(item.pricePerItem),
      }))
    "
    :columns="columns"
    :ui="{
      divide: '',
      base: 'min-w-full table-fixed',
      wrapper:
        'relative overflow-x-auto w-full mt-[14px] food-medicine-stock-table',
      th: {
        base: 'text-left',
        padding: 'py-[9px] px-2',
        size: 'text-sm',
        color: 'text-[#1D2433]',
      },
      tbody: '',
      td: {
        padding: 'py-[9px] px-2',
        size: 'text-sm',
        color: 'text-[#1D2433]',
      },
    }"
  >
    <template #name-data="{ row }">
      <span class="text-red-500">{{ row.name }}</span>
    </template>
  </UTable>
</template>

<style>
.food-medicine-stock-table tbody tr:nth-child(odd) {
  @apply bg-white;
}
.food-medicine-stock-table tbody tr:nth-child(even) {
  @apply bg-[#F8F9FC];
}
</style>

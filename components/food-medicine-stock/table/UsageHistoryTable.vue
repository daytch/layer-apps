<script setup lang="ts">
const COLUMNS = [
  "ID Kandang",
  "Nama Pelanggan",
  "Tanggal",
  "ID Barang",
  "Nama Barang",
  "Tipe",
  "Value Qty.",
  "Total",
];
const data = {
  id: "100000051",
  name: "AHMAD ROZIKIN",
  date: "02/10/2023",
  itemId: "G10000000851",
  itemName: "Stres Block",
  type: "KREDIT",
  quantity: 10,
  total: 121000,
};
</script>

<template>
  <div class="w-full overflow-x-auto mt-8">
    <table class="w-full">
      <thead>
        <tr class="bg-[--app-gray-100]">
          <th
            v-for="column in COLUMNS"
            class="p-2 bg-transparent text-sm font-medium leading-[22px] text-[--app-dark-900] text-left whitespace-nowrap"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in [data, data, data, data, data]"
          class="bg-white even:bg-[#F8F9FC]"
        >
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.id }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] uppercase"
          >
            {{ item?.name }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.date }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.itemId }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.itemName }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] uppercase"
          >
            {{ item?.type }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.quantity }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ formatMoney(item?.total) }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-[--app-primary-800]">
          <th
            :colspan="COLUMNS.length - 2"
            class="p-2 bg-transparent text-sm font-medium leading-[22px] text-[--app-dark-900] text-left"
          >
            Total
          </th>
          <th
            class="p-2 bg-transparent text-sm font-medium leading-[22px] text-[--app-dark-900] text-left"
          >
            6642
          </th>
          <th
            class="p-2 bg-transparent text-sm font-medium leading-[22px] text-[--app-dark-900] text-left"
          >
            {{ formatMoney(49353900) }}
          </th>
        </tr>
        <tr class="bg-[--app-primary-100]">
          <th
            :colspan="COLUMNS.length - 2"
            class="p-2 bg-transparent text-sm font-bold leading-[22px] text-white text-left"
          >
            Grand Total
          </th>
          <th
            class="p-2 bg-transparent text-sm font-bold leading-[22px] text-white text-left"
          >
            6642
          </th>
          <th
            class="p-2 bg-transparent text-sm font-bold leading-[22px] text-white text-left"
          >
            {{ formatMoney(49353900) }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

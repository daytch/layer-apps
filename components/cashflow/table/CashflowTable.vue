<script setup lang="ts">
import type { CashflowDataType } from "~/types/cashflow";

defineProps<{
  items: Array<CashflowDataType>;
}>();

defineEmits<{
  (e: "handleShowUpdateModal", item: CashflowDataType): void;
}>();
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
              <button type="button">
                <IconTrash :width="24" :height="24" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

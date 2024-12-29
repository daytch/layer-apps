<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { FoodMedicineHistoryParams } from "~/types/food-medicine-stock";

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
const { getFoodMedicHistory } = useFetchFoodMedicine();
const { queryParams } = useQueryParams();
const { data: historyData, pending } = await useAsyncData(
  ASYNC_KEY.FOOD_MEDIC_HISTORY,
  async () => {
    if (queryParams.value["tab"] !== "riwayat-pemakaian") return;
    const params = {} as FoodMedicineHistoryParams;
    const coopId = queryParams.value["coop"];
    if (queryParams.value["coop"] && !isNaN(Number(coopId))) {
      params["coop_id"] = Number(coopId);
    }

    return getFoodMedicHistory(params);
  },
  {
    lazy: true,
    watch: [queryParams],
  }
);
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
        <template v-if="pending">
          <tr class="bg-white">
            <td
              :colspan="COLUMNS.length"
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] border border-t-0"
            >
              <LoadingSpinner />
            </td>
          </tr>
        </template>
        <template v-else-if="!pending && !!historyData?.data?.length">
          <tr
            v-for="item in historyData?.data"
            class="bg-white even:bg-[#F8F9FC]"
          >
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.coopId }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] uppercase"
            >
              {{ item?.pic }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ formatDate(item?.transaction_date) }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.sku }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.medicine }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] uppercase"
            >
              {{ item?.tipe }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.qty }}
            </td>
            <td
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ formatMoney(item?.total) }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="bg-white">
            <td
              :colspan="COLUMNS.length"
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] border border-t-0"
            >
              <NoDataStatus>Data Riwayat Tidak Ditemukan.</NoDataStatus>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot v-if="!pending && !!historyData?.data?.length">
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
            {{ historyData?.total?.qytTotal }}
          </th>
          <th
            class="p-2 bg-transparent text-sm font-medium leading-[22px] text-[--app-dark-900] text-left"
          >
            {{ formatMoney(historyData?.total?.transactionTotal || 0) }}
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
            {{ historyData?.total?.qytTotal }}
          </th>
          <th
            class="p-2 bg-transparent text-sm font-bold leading-[22px] text-white text-left"
          >
            {{ formatMoney(historyData?.total?.transactionTotal || 0) }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

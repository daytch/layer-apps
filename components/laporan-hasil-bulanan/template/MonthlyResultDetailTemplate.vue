<script setup lang="ts">
import { MONTHLY_REPORT_DETAIL_KEY } from "~/constants/api";
import type { MonthlyReportDataType } from "~/types/month-report";

const detailData = ref<MonthlyReportDataType | undefined>(undefined);

onMounted(() => {
  const data = localStorage.getItem(MONTHLY_REPORT_DETAIL_KEY);
  if (data) {
    detailData.value = JSON.parse(data);
  }
});
</script>

<template>
  <div class="w-full p-6 border border-[--app-gray-500] bg-white rounded-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <tr>
          <th class="w-44 py-1">Kandang</th>
          <td>{{ detailData?.coopId }}</td>
        </tr>
        <tr>
          <th class="w-44 py-1">Nama Kandang</th>
          <td>{{ detailData?.name }}</td>
        </tr>
        <tr>
          <th class="w-44 py-1">Periode</th>
          <td>{{ formatDate(detailData?.transDate || "", "MMMM yyyy") }}</td>
        </tr>
        <tr>
          <th class="w-44 py-1">Alamat</th>
          <td>-</td>
        </tr>
      </table>
    </div>
    <div class="w-full max-w-[775px]">
      <div class="w-full overflow-x-auto result-table">
        <table class="w-full">
          <thead>
            <tr>
              <th></th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Pengeluaran</th>
              <td>{{ formatMoney(detailData?.totalExpenses || 0) }}</td>
            </tr>
            <tr>
              <th>Pemasukan</th>
              <td>{{ formatMoney(detailData?.totalIncome || 0) }}</td>
            </tr>
            <tr>
              <th>Pendapatan Bersih</th>
              <td>{{ formatMoney(detailData?.netincome || 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table th {
  @apply text-left text-sm font-normal leading-[22px] text-[--app-dark-100] whitespace-nowrap;
}
table td {
  @apply text-left py-1 text-sm font-normal leading-[22px] text-[--app-dark-100];
}
.result-table td,
.result-table th {
  @apply p-4;
}
.result-table tbody tr {
  @apply border-b border-[--app-gray-500];
}
</style>

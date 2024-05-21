<script setup lang="ts">
import type { CashflowDataType } from "~/types/cashflow";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Cashflow | Layer Apps",
  description: "Cashflow | Layer Apps",
});
const data: Array<CashflowDataType> = [
  {
    id: 2,
    periode: "2024-04-12T00:00:00.000Z",
    trans_date: "2024-04-12T11:14:00.732Z",
    tipe: "DEBIT",
    nominal: 0,
    total: 0,
  },
  {
    id: 3,
    periode: "2024-04-12T00:00:00.000Z",
    trans_date: "2024-04-12T11:14:00.732Z",
    tipe: "KREDIT",
    nominal: 51000,
    total: 51000,
  },
];
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px]">
    <DashboardContainer>
      <DashboardHeadingTitle>Cashflow (Rekap Pemasukan)</DashboardHeadingTitle>
      <div class="w-full max-w-[505px] mt-8">
        <BalanceCard />
      </div>
      <CashflowTemplate :items="data" />
    </DashboardContainer>
  </div>
</template>

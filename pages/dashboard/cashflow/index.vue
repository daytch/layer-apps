<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { CashflowDataType } from "~/types/cashflow";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Cashflow | Layer Apps",
  description: "Cashflow | Layer Apps",
});
const { getAllCashflows } = useFetchCashflow();
const { data, pending: cashflowsLoading } = await useAsyncData(
  ASYNC_KEY.cashflow,
  async () => getAllCashflows(),
  { lazy: true }
);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px]">
    <DashboardContainer>
      <DashboardHeadingTitle>Cashflow (Rekap Pemasukan)</DashboardHeadingTitle>
      <div class="w-full max-w-[505px] mt-8">
        <BalanceCard :total-cashflow="data?.total || 0" />
      </div>
      <CashflowTemplate
        :items="data?.cashflow || []"
        :loading="cashflowsLoading"
      />
    </DashboardContainer>
  </div>
</template>

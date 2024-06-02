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
const { data: cashflows, pending: cashflowsLoading } = await useAsyncData(
  ASYNC_KEY.cashflow,
  async () => getAllCashflows(),
  { lazy: true }
);

const totalCashflow = computed(() => {
  if (!cashflows?.value?.length) return 0;
  return cashflows?.value?.reduce((prev, current) => prev + current.total, 0);
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px]">
    <DashboardContainer>
      <DashboardHeadingTitle>Cashflow (Rekap Pemasukan)</DashboardHeadingTitle>
      <div class="w-full max-w-[505px] mt-8">
        <BalanceCard :total-cashflow="totalCashflow" />
      </div>
      <CashflowTemplate :items="cashflows || []" :loading="cashflowsLoading" />
    </DashboardContainer>
  </div>
</template>

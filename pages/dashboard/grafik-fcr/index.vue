<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Grafik FCR | Layer Apps",
  description: "Grafik FCR | Layer Apps",
});
const { getFCRChartData } = useFetchDashboard();
const { queryParams } = useQueryParams();
const { data, pending } = await useAsyncData(
  ASYNC_KEY.FCR_CHART,
  async () =>
    getFCRChartData({
      coopId:
        !!queryParams.value["coopId"]?.length && !isNaN(Number(queryParams.value?.["coopId"]))
          ? Number(queryParams.value?.["coopId"])
          : undefined,
      period: queryParams.value?.["periode"]?.toString(),
    }),
  {
    lazy: true,
    watch: [queryParams],
  }
);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Grafik FCR</DashboardHeadingTitle>
      <GrafikChartFilter />
      <FCRChart :fcr-data="data?.data || []" :is-loading="pending" />
    </DashboardContainer>
  </div>
</template>

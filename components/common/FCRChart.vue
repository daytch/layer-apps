<script setup lang="ts">
import type { FCRChartDataType } from "~/types/fcr-chart";

const props = defineProps<{
  fcrData: Array<FCRChartDataType>;
  isLoading?: boolean;
}>();

const sortedData = computed(() =>
  (props?.fcrData || []).sort(
    (a, b) => (new Date(a.transDate) as any) - (new Date(b.transDate) as any)
  )
);

const chartOptions = ref({
  chart: {
    type: "area",
    height: 500,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      tools: {
        download: false,
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: any) {
      return val.toFixed(2);
    },
    style: {
      fontSize: "14px",
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 100],
    },
  },
  colors: ["#4ade80"], // Green color
  xaxis: {
    type: "datetime",
    labels: {
      formatter: function (val: any) {
        return new Date(val).toLocaleDateString("id-ID", {
          month: "short",
          day: "numeric",
        });
      },
      style: {
        fontSize: "14px",
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: any) {
        return val.toFixed(2);
      },
      style: {
        fontSize: "14px",
      },
    },
  },
  markers: {
    size: 6,
    hover: {
      size: 8,
    },
  },
  tooltip: {
    x: {
      format: "dd MMM",
    },
  },
  grid: {
    show: true,
    borderColor: "#f1f1f1",
    strokeDashArray: 0,
  },
});

const series = computed(() => [
  {
    name: "FCR",
    data: sortedData.value.map((item) => ({
      x: new Date(item.transDate).getTime(),
      y: item.FCR,
    })),
  },
]);
</script>

<template>
  <UCard ref="cardRef" :ui="{ body: { padding: '!pb-3 !px-0' } as any }">
    <template #header>
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div>
          <h3
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px] mb-1"
          >
            FCR Overall
          </h3>
        </div>

        <slot name="filter" />
      </div>
    </template>

    <div class="px-4">
      <template v-if="isLoading">
        <LoadingSpinner />
      </template>
      <template v-if="!!fcrData.length && !isLoading">
        <div class="w-full h-[500px]">
          <apexchart
            type="area"
            height="100%"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </template>
      <template v-else-if="!isLoading && !fcrData?.length">
        <NoDataStatus>Data tidak ditemukan.</NoDataStatus>
      </template>
      <template v-else>
        <div class="hidden" />
      </template>
    </div>
  </UCard>
</template>

<style>
.select-options .block.truncate {
  @apply text-base;
}
</style>

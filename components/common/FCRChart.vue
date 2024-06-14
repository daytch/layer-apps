<script setup lang="ts">
import {
  VisXYContainer,
  VisLine,
  VisAxis,
  VisArea,
  VisCrosshair,
  VisTooltip,
} from "@unovis/vue";
import type { FCRChartDataType } from "~/types/fcr-chart";

type DataRecord = FCRChartDataType;

defineProps<{
  fcrData: Array<FCRChartDataType>;
  isLoading?: boolean;
}>();

const x = (_: DataRecord, i: number) => i;
const y = (d: DataRecord) => d.FCR;

const template = (d: DataRecord) =>
  `${formatDate(d.transDate, "dd MMMM")}: ${d.FCR}`;
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
          <p class="text-base leading-6 text-[--app-primary-text]">
            Nilai terakhir : 2,75
          </p>
        </div>

        <slot name="filter" />
      </div>
    </template>

    <div class="px-4">
      <template v-if="isLoading">
        <LoadingSpinner />
      </template>
      <template v-if="!!fcrData.length && !isLoading">
        <VisXYContainer
          :data="fcrData"
          :padding="{ top: 10 }"
          class="h-[383px]"
          :width="'100%'"
        >
          <VisLine :x="x" :y="y" color="rgb(var(--color-primary-DEFAULT))" />
          <VisArea
            :x="x"
            :y="y"
            color="rgb(var(--color-primary-DEFAULT))"
            :opacity="0.1"
          />
          <VisAxis
            type="y"
            :tick-format="(i:any) => {
          return i
        }"
          />
          <VisAxis
            type="x"
            :x="x"
            :tick-format="(i: number) => {
            if(!fcrData[i]) {
              return ''
            }
          return formatDate(fcrData[i].transDate, 'MMM')
        }"
          />

          <VisCrosshair
            color="rgb(var(--color-primary-DEFAULT))"
            :template="template"
          />

          <VisTooltip />
        </VisXYContainer>
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

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
  --vis-crosshair-circle-stroke-color: #fff;

  --vis-axis-grid-color: rgb(var(--color-gray-200));
  --vis-axis-tick-color: rgb(var(--color-gray-200));
  --vis-axis-tick-label-color: rgb(var(--color-gray-400));

  --vis-tooltip-background-color: #fff;
  --vis-tooltip-border-color: rgb(var(--color-gray-200));
  --vis-tooltip-text-color: rgb(var(--color-gray-900));
}
</style>
<style>
.select-options .block.truncate {
  @apply text-base;
}
</style>

<script setup lang="ts">
import {
  VisXYContainer,
  VisLine,
  VisAxis,
  VisArea,
  VisCrosshair,
  VisTooltip,
} from "@unovis/vue";

type DataRecord = { date: string | Date; amount: number };

const data: DataRecord[] = [
  {
    date: "2024-03-15T17:00:00.000Z",
    amount: 4662,
  },
  {
    date: "2024-03-16T17:00:00.000Z",
    amount: 2340,
  },
  {
    date: "2024-03-17T17:00:00.000Z",
    amount: 8950,
  },
  {
    date: "2024-03-18T17:00:00.000Z",
    amount: 7497,
  },
  {
    date: "2024-03-19T17:00:00.000Z",
    amount: 3777,
  },
  {
    date: "2024-03-20T17:00:00.000Z",
    amount: 6180,
  },
  {
    date: "2024-03-21T17:00:00.000Z",
    amount: 1260,
  },
  {
    date: "2024-03-22T17:00:00.000Z",
    amount: 8776,
  },
  {
    date: "2024-03-23T17:00:00.000Z",
    amount: 4850,
  },
  {
    date: "2024-03-24T17:00:00.000Z",
    amount: 2535,
  },
  {
    date: "2024-03-25T17:00:00.000Z",
    amount: 2382,
  },
  {
    date: "2024-03-26T17:00:00.000Z",
    amount: 4615,
  },
  {
    date: "2024-03-27T17:00:00.000Z",
    amount: 3607,
  },
  {
    date: "2024-03-28T17:00:00.000Z",
    amount: 3946,
  },
  {
    date: "2024-03-29T17:00:00.000Z",
    amount: 8588,
  },
];

const x = (_: DataRecord, i: number) => i;
const y = (d: DataRecord) => d.amount;

const template = (d: DataRecord) =>
  `${formatDate(d.date, "dd MMMM")}: ${d.amount}`;
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
      <VisXYContainer
        :data="data"
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
            if(!data[i]) {
              return ''
            }
          return formatDate(data[i].date, 'MMM')
        }"
        />

        <VisCrosshair
          color="rgb(var(--color-primary-DEFAULT))"
          :template="template"
        />

        <VisTooltip />
      </VisXYContainer>
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

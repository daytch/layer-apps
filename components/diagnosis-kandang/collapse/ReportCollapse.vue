<script setup lang="ts">
import { type DiagnosisKandang } from "~/types/report";

defineProps<{ reports: Array<DiagnosisKandang> }>();
</script>

<template>
  <UAccordion
    :items="reports.map((report) => ({ ...report, label: '' }))"
    :ui="{
      item: {
        padding: '',
      },
    }"
  >
    <template #default="{ item, index, open }">
      <button
        type="button"
        class="flex items-center justify-start space-x-2 text-sm text-[#1D2433] lg:text-base py-[9px] px-2"
        :class="{
          'border-b': !open,
          'bg-[--app-danger-600]': item?.progress !== 'HANDLED',
          'bg-white': item?.progress === 'HANDLED',
        }"
      >
        <UIcon
          name="i-heroicons-minus-circle"
          v-if="open"
          class="w-[22px] h-[22px] text-[--app-danger-200]"
        />
        <UIcon
          name="i-heroicons-plus-circle"
          v-else
          class="w-[22px] h-[22px] text-[--app-primary-100]"
        />
        <span class="inline-block">{{ item?.cageName }}</span>
      </button>
    </template>
    <template #item="{ item, open }">
      <div
        :class="{
          'border-b': open,
          'bg-[--app-danger-600]': item?.progress !== 'HANDLED',
          'bg-white': item?.progress === 'HANDLED',
        }"
      >
        <ReportCard :report="item" />
      </div>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import VueDatePicker, { type TimeModel } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { id } from "date-fns/locale";

defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

defineProps<{
  modelValue: any;
  placeholder?: string;
  errorState?: string;
}>();
</script>

<template>
  <VueDatePicker
    :model-value="modelValue"
    :teleport="true"
    time-picker
    range
    @update:model-value="(value: any) => $emit('update:modelValue', value)"
    :select-text="'Pilih'"
    :cancel-text="'Batal'"
    v-bind="$attrs"
    :format-locale="id"
  >
    <template #dp-input="{ value }">
      <input
        :value="value"
        :placeholder="placeholder"
        class="py-3 pr-5 pl-11 text-base ring-1 ring-[#DFE4EA] rounded-md bg-white w-full focus:ring-[--app-primary-100] outline-none focus:ring-2 disabled:bg-[--app-gray-200]"
        :class="{
          'ring-red-500 focus:ring-red-500': !!errorState?.length,
        }"
      />
    </template>
    <template #input-icon>
      <UIcon
        name="i-heroicons-calendar-days"
        class="w-4 h-4 text-[--app-dark-100]"
      />
    </template>
    <template #action-preview="{ value }">
      <span class="hidden">{{ value }}</span>
    </template>
    <template #clear-icon>
      <div class="hidden"></div>
    </template>
  </VueDatePicker>
</template>

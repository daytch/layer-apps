<script setup lang="ts">
import VueDatePicker, { type ModelValue } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { id } from "date-fns/locale";
import formatDate from "~/utils/formatDate";

defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
}>();

defineProps<{
  modelValue?: ModelValue;
  placeholder?: string;
  errorState?: string;
  range?: boolean;
}>();
</script>

<template>
  <VueDatePicker
    :format-locale="id"
    :model-value="modelValue"
    :teleport="true"
    :range="range"
    :enable-time-picker="false"
    @update:model-value="(value: any) => $emit('update:modelValue', value)"
    :select-text="'Pilih'"
    :cancel-text="'Batal'"
    v-bind="$attrs"
  >
    <template #dp-input="{ value }">
      <input
        :value="value"
        :placeholder="placeholder"
        class="py-3 pr-5 pl-11 text-base ring-1 ring-[#DFE4EA] rounded-md bg-white w-full focus:ring-[--app-primary-100] outline-none focus:ring-2 disabled:bg-[--app-gray-200] text-[--app-primary-text] placeholder:text-[--app-primary-text]"
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
      {{
        Array.isArray(value)
          ? value.map((v) => formatDate(v, "dd MMM yy")).join("-")
          : formatDate(value, "dd MMM yy")
      }}
    </template>
  </VueDatePicker>
</template>

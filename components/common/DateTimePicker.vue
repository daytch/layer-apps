<script setup lang="ts">
import VueDatePicker, { type ModelValue } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { id } from "date-fns/locale";

defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
}>();

defineProps<{
  modelValue: ModelValue | undefined;
}>();
</script>

<template>
  <VueDatePicker
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    :select-text="'Pilih'"
    :cancel-text="'Batal'"
    v-bind="$attrs"
    :format-locale="id"
    :teleport="true"
  >
    <template #dp-input="props">
      <slot name="input" v-bind="props" />
    </template>
    <template #clear-icon>
      <div class="hidden"></div>
    </template>
    <template #action-preview="{ value }">
      <span class="hidden">{{ value }}</span>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import type { ModelValue } from "@vuepic/vue-datepicker";
import { UI_PRIMARY_BUTTON_STYLES, UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";

type RangeDate = {
  from: string;
  to: string;
};
defineEmits<{
  (e: "handleAddData"): void;
  (e: "update:modelValue", value: ModelValue): void;
  (e: "applyFilter"): void;
}>();
defineProps<{
  showAddButton: boolean;
  addButtonText?: string;
  containerClass?: string;
  modelValue: ModelValue | undefined;
}>();
</script>

<template>
  <div class="p-4 border rounded" :class="containerClass">
    <div
      class="flex flex-col lg:flex-row lg:items-center"
      :class="{
        'lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4': showAddButton,
        'lg:justify-end': !showAddButton,
      }"
    >
      <UButton
        v-if="showAddButton"
        @click="$emit('handleAddData')"
        type="button"
        icon="i-heroicons-plus"
        size="md"
        :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
      >
        {{ addButtonText || "" }}
      </UButton>
      <div
        class="flex flex-col lg:flex-row lg:items-center justify-end space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto"
      >
        <slot name="additional" />
        <div class="max-w-full lg:max-w-[300px]">
          <Datepicker
            :range="true"
            :model-value="modelValue"
            @update:model-value="(value) => $emit('update:modelValue', value)"
            placeholder="Pilih Tanggal"
          />
        </div>
        <UButton
          @click="$emit('applyFilter')"
          type="button"
          size="md"
          color="primary"
          variant="ghost"
          :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
        >
          Tampilkan
        </UButton>
      </div>
    </div>
  </div>
</template>

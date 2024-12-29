<template>
  <VueDatePicker
    v-bind="$props"
    v-on="$attrs"
    @update:model-value="handleUpdateModelValue"
    :format-locale="id"
  />
</template>

<script setup lang="ts">
import VueDatePicker, { type VueDatePickerProps } from "@vuepic/vue-datepicker";
import { id } from "date-fns/locale";

const emits = defineEmits<{
  (event: string, ...args: any[]): void;
}>();
defineProps<VueDatePickerProps>();
const { emitFormChange } = useFormGroup();

const handleUpdateModelValue = (value: any) => {
  emits("update:model-value", value);
  emitFormChange();
};
</script>

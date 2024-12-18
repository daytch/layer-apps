<script setup lang="ts">
import type { UInput } from "#build/components";

const props = defineProps<{
  modelValue: number;
  placeholder: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  "update:modelValue": [number?];
}>();

// const value = ref(0);
const inputEl = ref<typeof UInput | null>(null);

const displayValue = computed(() => {
  if (Number.isNaN(props.modelValue)) {
    return "";
  }
  let parts = props.modelValue.toString().split(",");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
});

const updateValue = async (newValue?: string) => {
  const nativeInput = inputEl.value?.input;
  const selectionStart = nativeInput.selectionStart;
  const selectionEnd = nativeInput.selectionEnd;

  // calculate the position offset caused by commas
  const beforeUpdateValue = nativeInput.value;
  const beforeUpdateCommas = (
    beforeUpdateValue.slice(0, selectionStart).match(/,/g) || []
  ).length;

  // empty value means user cleared everything, so the value should be 0
  if (newValue === "") {
    emit("update:modelValue", 0);

    await nextTick();

    // restore cursor position
    nativeInput.setSelectionRange(selectionStart, selectionStart);
    return;
  }

  // do not update if the value is not a number
  if (!newValue || Number.isNaN(parseFloat(newValue))) {
    return;
  }

  emit("update:modelValue", parseFloat(newValue.replace(/[^0-9,-]/g, "")));

  await nextTick();

  // calculate new comma count and adjust cursor position accordingly
  const afterUpdateValue = nativeInput.value;
  const afterUpdateCommas = (
    afterUpdateValue.slice(0, selectionStart).match(/./g) || []
  ).length;
  const commaOffset = afterUpdateCommas - beforeUpdateCommas;

  // restore cursor position
  nativeInput.setSelectionRange(
    selectionStart + commaOffset,
    selectionEnd + commaOffset
  );
};

const preventInvalidInput = (event: KeyboardEvent) => {
  // if the user hit period and the value already contains one, don' allow
  if (
    event.key === "," &&
    (event.currentTarget as HTMLInputElement).value.includes(".")
  ) {
    event.preventDefault();
    return;
  }

  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
};
</script>

<template>
  <UInput
    ref="inputEl"
    :model-value="displayValue"
    @update:model-value="updateValue"
    @keypress="preventInvalidInput"
    :placeholder="$props?.placeholder"
    :disabled="$props?.disabled"
  >
    <template #leading>
      <span class="text-gray-500 dark:text-gray-400 text-xs">Rp</span>
    </template>
  </UInput>
</template>

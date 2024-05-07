<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

const isOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{
      strategy: 'override',
      width: 'w-full max-w-[644px] md:max-w-[644px]',
      container: 'flex min-h-full items-center justify-center text-center',
    }"
  >
    <slot />
  </UModal>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue", "handleConfirmDelete"]);
const props = defineProps<{
  modelValue: boolean;
  title: string;
  isLoading?: boolean;
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
      width: 'w-full max-w-[530px] md:max-w-[530px]',
      container: 'flex min-h-full items-center justify-center text-center',
    }"
  >
    <UCard
      :ui="{
        base: 'overflow-hidden',
        ring: '',
        divide: '',
        rounded: 'rounded-[20px]',
        shadow: '',
        body: {
          base: '',
          background: 'bg-white',
          padding: 'p-[50px]',
        },
      }"
    >
      <div class="flex flex-col items-center">
        <div
          class="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[--app-danger-700] mb-[22px]"
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="w-6 h-6 text-[--app-danger-200]"
          />
        </div>
        <p
          class="text-[--app-dark-100] font-semibold text-2xl text-center mb-4 leading-[30px]"
        >
          {{ title }}
        </p>
        <slot name="description" />
        <div class="flex items-center justify-between space-x-[18px] w-full">
          <button
            @click="$emit('update:modelValue', false)"
            type="button"
            :disabled="isLoading"
            class="py-[13px] px-4 text-base font-medium leading-6 flex-1 inline-flex items-center justify-center ring-1 ring-[#DFE4EA] rounded-md text-[--app-dark-100]"
          >
            Batal
          </button>
          <button
            @click="$emit('handleConfirmDelete')"
            type="button"
            :disabled="isLoading"
            class="py-[13px] px-4 text-base font-medium leading-6 flex-1 inline-flex items-center justify-center bg-[--app-danger-200] text-white hover:opacity-75 rounded-md ring-1 ring-[--app-danger-200]"
          >
            {{ isLoading ? "Tunggu..." : "Hapus" }}
          </button>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style>
.delete-confirm-description {
  @apply text-base font-normal leading-6 text-[--app-primary-text] mb-9 text-center;
}
</style>

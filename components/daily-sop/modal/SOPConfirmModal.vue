<script setup lang="ts">
import type { SOPDataType } from "~/types/sop";
defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleConfirm"): void;
}>();

defineProps<{ selectedSOPItem?: SOPDataType; isLoading?: boolean }>();
</script>

<template>
  <div class="px-6 py-6">
    <NuxtImg
      src="/images/dashboard/welcome-admin-illustration.png"
      format="webp"
      alt=""
      width="150"
      height="120"
      class="block mx-auto mb-6"
    />
    <h3
      class="text-lg text-black font-semibold leading-[26px] mb-3 text-center"
    >
      Sudah mengerjakan SOP ini?
    </h3>
    <p
      v-if="selectedSOPItem"
      class="text-[--app-dark-500] text-base font-normal leading-6 mb-6 text-center"
    >
      {{ selectedSOPItem?.title }}
    </p>
    <UButton
      @click="$emit('handleConfirm')"
      type="button"
      :disabled="isLoading"
      block
      size="md"
      :ui="{
        strategy: 'override',
        base: 'uppercase',
        padding: {
          md: 'py-[13px] px-7',
        },
        color: {
          primary: {
            solid:
              'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
          },
        },
      }"
    >
      {{ isLoading ? "MENYIMPAN.." : "SUDAH" }}
    </UButton>
    <UButton
      @click="$emit('handleCloseModal')"
      type="button"
      color="sky"
      variant="ghost"
      block
      class="mt-[10px]"
      size="md"
      :ui="{
        strategy: 'override',
        base: 'uppercase',
        padding: {
          md: 'py-[13px] px-7',
        },
        color: {
          sky: {
            ghost: 'bg-white text-[--app-dark-100] disabled:cursor-not-allowed',
          },
        },
      }"
    >
      BATAL
    </UButton>
  </div>
</template>

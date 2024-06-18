<script setup lang="ts">
import { UI_PRIMARY_BUTTON_STYLES, UI_GHOST_BUTTON_STYLES } from "~/constants/ui";
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
    <h3 class="text-lg text-black font-semibold leading-[26px] mb-3 text-center">
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
        ...UI_PRIMARY_BUTTON_STYLES,
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
      :ui="{ ...UI_GHOST_BUTTON_STYLES }"
    >
      BATAL
    </UButton>
  </div>
</template>

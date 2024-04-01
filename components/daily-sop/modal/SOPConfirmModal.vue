<script setup lang="ts">
import type { SOPItem } from "~/types/sop";
const { showModal, selectedItem } = useSelectSOP();
defineEmits<{
  (e: "handleConfirm", item: SOPItem | null): void;
}>();
</script>

<template>
  <UModal
    v-model="showModal"
    :ui="{
      strategy: 'override',
      container: 'flex min-h-full items-center justify-center text-center',
      width: 'w-full max-w-[343px] md:max-w-[500px]',
    }"
  >
    <div class="px-4 py-6">
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
        v-if="selectedItem"
        class="text-[--app-dark-500] text-base font-normal leading-6 mb-6 text-center"
      >
        {{ selectedItem?.title }}
      </p>
      <UButton
        @click="() => $emit('handleConfirm', selectedItem)"
        type="button"
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
        SUDAH
      </UButton>
      <UButton
        @click="() => (showModal = false)"
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
              ghost:
                'bg-white text-[--app-dark-100] disabled:cursor-not-allowed',
            },
          },
        }"
      >
        BATAL
      </UButton>
    </div>
  </UModal>
</template>

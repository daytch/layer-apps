<script setup lang="ts">
const { duplicateDateMessage, isLoading, handleConfirmDuplicateEggData } =
  useUploadEggData();

const handleConfirmDuplicate = async (code: number) => {
  handleConfirmDuplicateEggData(code);
};
</script>

<template>
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
        Ada data yang sudah diinput sebelumnya
      </p>
      <p class="text-base text-[--app-primary-text] space-y-2 text-center mb-9">
        Apakah anda yakin, untuk mengganti / replace :<br />
        <span v-for="date in duplicateDateMessage" class="font-bold block">{{
          date
        }}</span>
      </p>
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full"
      >
        <button
          type="button"
          :disabled="isLoading"
          @click="handleConfirmDuplicate(0)"
          class="flex-1 inline-flex justify-center rounded-md text-base font-medium p-3 bg-white text-[--app-dark-100] border border-[#DFE4EA] disabled:bg-[--app-dark-800] disabled:border-[--app-dark-800] disabled:text-[--app-dark-500]"
        >
          Batal
        </button>
        <button
          type="button"
          :disabled="isLoading"
          @click="handleConfirmDuplicate(1)"
          class="flex-1 inline-flex justify-center rounded-md text-base font-medium p-3 bg-white text-[--app-dark-100] border border-[#DFE4EA] disabled:bg-[--app-dark-800] disabled:border-[--app-dark-800] disabled:text-[--app-dark-500]"
        >
          Lewati Ini
        </button>
        <button
          type="button"
          :disabled="isLoading"
          @click="handleConfirmDuplicate(2)"
          class="flex-1 inline-flex justify-center rounded-md text-base font-medium p-3 bg-[--app-danger-200] text-white border border-[--app-danger-200] disabled:bg-[--app-dark-800] disabled:border-[--app-dark-800] disabled:text-[--app-dark-500]"
        >
          Replace All
        </button>
      </div>
    </div>
  </UCard>
</template>

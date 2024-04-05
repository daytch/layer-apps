<script setup lang="ts">
import { type Kandang } from "~/types/kandang";

const FILTER_OPTIONS = [
  {
    label: "Semua",
    value: "all",
  },
];
const activeFilter = ref(undefined);
const showAddKandangModal = ref(false);
const DUMMY_KANDANG = ref<Array<Kandang>>([
  {
    cageId: "COKRO-1",
    cageName: "Kandang Jatisari",
    address: "Jatisari, Blado, Batang",
  },
  {
    cageId: "COKRO-2",
    cageName: "Kandang Blado",
    address: "Jatisari, Blado, Batang",
  },
  {
    cageId: "COKRO-3",
    cageName: "Kandang Batang",
    address: "Jatisari, Blado, Batang",
  },
]);
</script>

<template>
  <div
    class="p-4 border rounded flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-between bg-white"
  >
    <UButton
      @click="showAddKandangModal = true"
      type="button"
      icon="i-heroicons-plus"
      size="md"
      :ui="{
        strategy: 'override',
        base: '',
        padding: {
          md: 'py-[13px] px-4',
        },
        color: {
          primary: {
            solid:
              'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
          },
        },
      }"
    >
      Tambah Kandang
    </UButton>
    <UInputMenu
      size="md"
      :nullable="true"
      v-model="activeFilter"
      :options="FILTER_OPTIONS"
      placeholder="Pilih Filter"
      :input-class="'input-select-trigger'"
    />
  </div>
  <KandangTable :kandang="DUMMY_KANDANG" />
  <AppModal v-model="showAddKandangModal">
    <KandangModalForm @handle-close-modal="showAddKandangModal = false" />
  </AppModal>
</template>

<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { KandangPayload, KandangType } from "~/types/kandang";

const { getAllKandang, createKandang, updateSelectedKandang, isLoading } =
  useKandang();
const { data, pending, error } = await useAsyncData(
  ASYNC_KEY.kandang,
  getAllKandang,
  {
    lazy: true,
  }
);

const FILTER_OPTIONS = [
  {
    label: "Semua",
    value: "all",
  },
];
const activeFilter = ref(undefined);
const {
  showModal,
  handleCloseModal,
  handleShowModal,
  selectedItem: selectedKandang,
} = useModalForm<KandangType>();

const handleSubmitForm = async (
  data: KandangPayload,
  id?: number | undefined
) => {
  handleCloseModal();
  if (id) {
    await updateSelectedKandang(id, data);
  } else {
    await createKandang(data);
  }
  selectedKandang.value = undefined;
};
</script>

<template>
  <div
    class="p-4 border rounded flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-between bg-white"
  >
    <UButton
      @click="() => handleShowModal(undefined)"
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
  <KandangTable
    :kandang="data || []"
    @handle-select-update-kandang="(kandang) => handleShowModal(kandang)"
    :loading="pending || isLoading"
    :error="error"
  />
  <AppModal v-model="showModal">
    <KandangModalForm
      :isLoading="isLoading"
      @handle-close-modal="handleCloseModal"
      @handle-success-add-kandang="
        (data) => handleSubmitForm(data, selectedKandang?.id)
      "
      :initial-value="selectedKandang"
    />
  </AppModal>
</template>

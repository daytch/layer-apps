<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { GetEggParams } from "~/types/egg";

const { queryParams } = useQueryParams();
const {
  getEggDataByCoopAndPeriode,
  selectedItems,
  deleteDataByRowByIds,
  checkAll,
  isLoading,
} = useFetchEggData();

const { data, pending } = await useAsyncData(
  ASYNC_KEY.EGG_DATA,
  async () => {
    const params: GetEggParams = {};
    const queryCoopId = queryParams.value["coopId"];
    const queryPeriod = queryParams.value["period"];

    if (!!queryCoopId?.toString().length && !isNaN(Number(queryCoopId))) {
      params["coopId"] = Number(queryParams.value["coopId"]);
    }
    params["period"] =
      !!queryPeriod?.toString().length && isValidDate(queryPeriod?.toString())
        ? queryPeriod?.toString()
        : undefined;
    return getEggDataByCoopAndPeriode(params);
  },
  { lazy: true, watch: [queryParams] }
);
const showDeleteConfirmModal = ref(false);

const handleDelete = async () => {
  const response = await deleteDataByRowByIds();
  if (!!response) {
    showDeleteConfirmModal.value = false;
  }
};
</script>

<template>
  <ProduksiTelurFilter
    :container-class="'bg-white'"
    :is-fetching-data="pending"
    :disable-delete-button="!selectedItems.length"
    @handle-show-modal-confirm="showDeleteConfirmModal = true"
  />
  <ProduksiTelurTable
    :egg-data="data || []"
    :is-loading-data="pending"
    v-model:check-all="checkAll"
    v-model:selected-items="selectedItems"
  />
  <DeleteConfirmModal
    v-model:model-value="showDeleteConfirmModal"
    title="Hapus data?"
    :is-loading="isLoading"
    @handle-confirm-delete="handleDelete"
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus data yang anda pilih?
      </p>
    </template>
  </DeleteConfirmModal>
</template>

<script setup lang="ts">
import { type KandangType } from "~/types/kandang";

defineProps<{
  kandang: Array<KandangType>;
  loading?: boolean;
  error?: any;
}>();
defineEmits<{
  (e: "handleSelectUpdateKandang", item: KandangType): void;
}>();

const { deleteKandang, isLoading } = useKandang();

const columns = [
  {
    key: "cageName",
    label: "Nama Kandang",
  },
  {
    key: "cageId",
    label: "ID Kandang",
  },
  {
    key: "address",
    label: "Alamat",
  },
  {
    key: "actions",
  },
];
const showDeleteConfirmModal = ref(false);
const selectedKandang = ref<KandangType | undefined>(undefined);

const handleDelete = async () => {
  if (!!selectedKandang.value?.id) {
    showDeleteConfirmModal.value = false;
    await deleteKandang(selectedKandang.value.id);
  }
  selectedKandang.value = undefined;
};
</script>

<template>
  <div class="w-full overflow-auto bg-white mt-8">
    <table class="w-full bg-white">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            class="whitespace-nowrap text-left text-base font-medium leading-6 text-[#1D2433] py-[18px] px-4"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!!kandang.length">
          <tr v-for="item in kandang" class="border-b">
            <td
              class="py-[27px] px-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item.name }}
            </td>
            <td
              class="py-[27px] px-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ item.nik }}
            </td>
            <td
              class="py-[27px] px-4 text-[--app-dark-100] font-medium text-sm"
            >
              {{ item.address }}
            </td>
            <td class="py-[27px] px-4">
              <div class="flex items-center space-x-5">
                <button
                  type="button"
                  @click="() => $emit('handleSelectUpdateKandang', item)"
                >
                  <IconPencilUpdate />
                </button>
                <button
                  type="button"
                  @click="
                    () => {
                      selectedKandang = item;
                      showDeleteConfirmModal = true;
                    }
                  "
                >
                  <IconTrash />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="!kandang.length && loading">
          <tr class="border-y">
            <td
              :colspan="columns.length"
              class="py-[27px] px-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              <LoadingSpinner />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="border-y">
            <td
              :colspan="columns.length"
              class="py-[27px] px-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              Data Kandang Tidak Ditemukan
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    title="Hapus Kandang"
    v-model="showDeleteConfirmModal"
    @handle-confirm-delete="handleDelete"
    :is-loading="isLoading"
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus :<br />
        {{ selectedKandang?.name }} - {{ selectedKandang?.nik }} ?
      </p>
    </template>
  </DeleteConfirmModal>
</template>

<style>
.table-kandang thead th:nth-child(1) {
  @apply w-[319px];
}
.table-kandang thead th:nth-child(2) {
  @apply w-[235px];
}
.table-kandang thead th:nth-child(3) {
  @apply w-[325px];
}
.table-kandang thead th:nth-child(4) {
  @apply w-[150px];
}
</style>

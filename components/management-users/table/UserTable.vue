<script setup lang="ts">
import type { User } from "~/types/user";

const columns = [
  {
    key: "name",
    label: "Nama",
  },
  {
    key: "id",
    label: "ID User",
  },
  {
    key: "phoneNumber",
    label: "No Hp",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
  },
];

defineProps<{
  users: User[];
}>();
const showDeleteConfirm = ref(false);
const selected = ref<User | undefined>(undefined);
</script>

<template>
  <UTable
    :columns="columns"
    class="user-table bg-[--app-gray-100] mt-8"
    :rows="users"
    :ui="{
      divide: '',
      base: 'w-full table-auto',
      td: {
        base: 'text-left whitespace-nowrap truncate max-w-0',
        size: 'text-sm',
        font: 'font-medium',
        color: 'text-[--app-dark-100]',
        padding: 'p-4',
      },
      th: {
        padding: 'py-[18px] px-4',
        size: 'text-base leading-6',
        font: 'font-medium',
        color: 'text-[#1D2433]',
      },
      tr: {
        base: '',
      },
    }"
  >
    <template #name-data="{ row }">
      <div class="flex flex-row items-center space-x-4 min-w-[150px]">
        <NuxtImg
          format="webp"
          :src="row.avatar"
          width="45"
          height="45"
          :alt="row?.name"
          class="w-[45px] h-[45px] rounded-full object-cover"
        />
        <p class="text-sm text-[--app-dark-100] font-medium leading-[22px]">
          {{ row?.name }}
        </p>
      </div>
    </template>
    <template #status-data="{ row }">
      <div
        v-if="row?.status === 'ACTIVE'"
        class="inline-flex items-center justify-center px-[10px] py-[3px] bg-[--app-primary-700] text-[--app-primary-200] rounded"
      >
        Aktif
      </div>
      <div
        v-else
        class="inline-flex items-center justify-center px-[10px] py-[3px] text-red-700 bg-red-200 rounded"
      >
        Tidak Aktif
      </div>
    </template>
    <template #actions-data="{ row }">
      <div class="flex items-center space-x-5">
        <button type="button">
          <IconPencilUpdate />
        </button>
        <button
          type="button"
          @click="
            () => {
              selected = row;
              showDeleteConfirm = true;
            }
          "
        >
          <IconTrash />
        </button>
      </div>
    </template>
  </UTable>
  <DeleteConfirmModal
    v-model="showDeleteConfirm"
    :title="'Hapus Karyawan'"
    @handle-confirm-delete="
      () => {
        console.log('delete', selected);
      }
    "
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus :<br />
        {{ selected?.name }} - {{ selected?.id }} ?
      </p>
    </template>
  </DeleteConfirmModal>
</template>

<style>
.user-table {
  @apply w-full overflow-x-auto;
}
.user-table thead tr th:first-child {
  min-width: 306px;
}
.user-table thead tr th:last-child {
  min-width: 127px;
}
.user-table thead tr th:nth-child(2) {
  min-width: 136px;
}
.user-table thead tr th:nth-child(3) {
  min-width: 136px;
}
.user-table thead tr th:nth-child(4) {
  min-width: 207px;
}
.user-table thead tr th:nth-child(5) {
  min-width: 141px;
}
</style>

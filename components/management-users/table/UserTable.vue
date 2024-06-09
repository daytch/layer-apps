<script setup lang="ts">
import type { UserType } from "~/types/user";

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
    key: "phone",
    label: "No Hp",
  },
  {
    key: "role_name",
    label: "Role",
  },
  {
    key: "is_active",
    label: "Status",
  },
  {
    key: "actions",
  },
];

defineProps<{
  users: Array<UserType>;
  loading?: boolean;
  error?: any;
}>();
defineEmits<{
  (e: "handleShowUpdateModal", item: UserType): void;
}>();

const showDeleteConfirm = ref(false);
const selected = ref<UserType | undefined>(undefined);
const { isLoading, deleteUserById } = useUser();

const handleDeleteUser = async () => {
  if (!selected.value?.id) return;
  try {
    await deleteUserById(selected.value.id);
    showDeleteConfirm.value = false;
  } finally {
  }
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
        <template v-if="loading">
          <td
            :colspan="columns.length"
            class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
          >
            <LoadingSpinner />
          </td>
        </template>
        <template v-else-if="!loading && !!users.length">
          <tr v-for="user in users" class="border-b">
            <td class="p-4 text-[--app-dark-100] font-medium text-sm">
              <div class="flex flex-row items-center space-x-4 min-w-[150px]">
                <NuxtImg
                  format="webp"
                  :src="user.avatar || '/images/no_photo.png'"
                  width="45"
                  height="45"
                  :alt="user?.name"
                  class="w-[45px] h-[45px] rounded-full object-cover"
                />
                <p
                  class="text-sm text-[--app-dark-100] font-medium leading-[22px]"
                >
                  {{ user?.name }}
                </p>
              </div>
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ user?.id }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ user?.phone || "-" }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              {{ user?.role_name }}
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              <div
                v-if="user?.is_active"
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
            </td>
            <td
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap"
            >
              <div class="flex items-center space-x-5">
                <button
                  type="button"
                  @click="$emit('handleShowUpdateModal', user)"
                >
                  <IconPencilUpdate />
                </button>
                <button
                  type="button"
                  @click="
                    () => {
                      selected = user;
                      showDeleteConfirm = true;
                    }
                  "
                >
                  <IconTrash />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <td :colspan="columns.length">
            <NoDataStatus>Data User Tidak Ditemukan</NoDataStatus>
          </td>
        </template>
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    v-model="showDeleteConfirm"
    :title="'Hapus Karyawan'"
    :is-loading="isLoading"
    @handle-confirm-delete="handleDeleteUser"
  >
    <template #description>
      <p class="delete-confirm-description">
        Apakah anda yakin, untuk menghapus :<br />
        {{ selected?.name }} - {{ selected?.id }} ?
      </p>
    </template>
  </DeleteConfirmModal>
</template>

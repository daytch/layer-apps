<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { UserType } from "~/types/user";

const FILTER_OPTIONS = [
  {
    label: "Semua",
    value: "all",
  },
];
const { getAllUsers } = useUser();
const showUserModal = ref(false);
const {
  data: users,
  pending,
  error,
} = await useAsyncData(ASYNC_KEY.user, async () => getAllUsers(), {
  lazy: true,
});
const activeFilter = ref(undefined);
</script>

<template>
  <div
    class="p-4 border rounded flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-between bg-white"
  >
    <UButton
      @click="showUserModal = true"
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
      Tambah User
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
  <UserTable :users="users || []" :loading="pending" :error="error" />
  <AppModal v-model="showUserModal">
    <UserModalForm
      @handle-close-modal="showUserModal = false"
      @handle-success-add-user="(data) => console.log(data)"
    />
  </AppModal>
</template>

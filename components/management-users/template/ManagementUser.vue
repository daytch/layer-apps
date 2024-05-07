<script setup lang="ts">
import type { User } from "~/types/user";

const FILTER_OPTIONS = [
  {
    label: "Semua",
    value: "all",
  },
];
const showUserModal = ref(false);
const USER_DUMMY = ref<Array<User>>([
  {
    id: "COKRO-01",
    avatar: "/images/user_dummy_avatar.png",
    name: "Ridwan Hakim",
    role: "MEMBER",
    status: "ACTIVE",
    phoneNumber: "081238213123",
  },
  {
    id: "COKRO-02",
    avatar: "/images/user_dummy_avatar.png",
    name: "Ridwan Hakim",
    role: "MEMBER",
    status: "INACTIVE",
    phoneNumber: "081238213123",
  },
]);
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
  <UserTable :users="USER_DUMMY" />
  <AppModal v-model="showUserModal">
    <UserModalForm
      @handle-close-modal="showUserModal = false"
      @handle-success-add-user="(data) => console.log(data)"
    />
  </AppModal>
</template>

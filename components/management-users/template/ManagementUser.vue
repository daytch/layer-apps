<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import type { FormSubmitType, UserType } from "~/types/user";

const FILTER_OPTIONS = [
  {
    label: "Semua",
    value: "all",
  },
];
const { getAllUsers, isLoading, submitFormUser } = useUser();
const { handleCloseModal, handleShowModal, selectedItem, showModal } = useModalForm<UserType>();
const {
  data: users,
  pending,
  error,
} = await useAsyncData(ASYNC_KEY.user, async () => getAllUsers(), {
  lazy: true,
});
const activeFilter = ref(undefined);

const handleSubmitForm = async (data: FormSubmitType) => {
  await submitFormUser(data);
  handleCloseModal();
};
</script>

<template>
  <div
    class="p-4 border rounded flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-between bg-white"
  >
    <UButton
      @click="handleShowModal(undefined)"
      type="button"
      icon="i-heroicons-plus"
      size="md"
      :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
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
  <UserTable
    :users="users || []"
    :loading="pending"
    :error="error"
    @handle-show-update-modal="(data) => handleShowModal(data)"
  />
  <AppModal v-model="showModal">
    <UserModalForm
      :form-default-value="selectedItem"
      :is-loading="isLoading"
      @handle-close-modal="handleCloseModal"
      @handle-success-add-user="(data) => handleSubmitForm(data)"
    />
  </AppModal>
</template>

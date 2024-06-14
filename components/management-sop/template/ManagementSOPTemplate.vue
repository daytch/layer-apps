<script setup lang="ts">
import type { SOPDataType, SOPFormPayloadType } from "~/types/sop";

const items = [
  {
    label: "Mandor",
    content: "",
  },
  {
    label: "Anak Kandang",
    content: "",
  },
];

const { selectedTab, handleChangeTab } = useAdminSOP(items);
const { isLoading, submitFormData } = useFetchSOP();
const { selectedItem, handleCloseModal, handleShowModal, showModal } =
  useModalForm<SOPDataType>();
const today = formatDate(new Date(), "yyyy-MM-dd");
const handleSubmitForm = (
  formPayload: { id?: number; roleName: string } & SOPFormPayloadType
) => {
  submitFormData(formPayload).then(() => {
    handleCloseModal();
  });
};
</script>

<template>
  <div
    class="flex items-center justify-between bg-white border border-[#DFE4EA] p-[14px] rounded-lg"
  >
    <div class="" role="tablist">
      <button
        v-for="(item, index) in items"
        @click="handleChangeTab(item.label)"
        class="inline-flex items-center justify-center py-3 px-9 text-base font-medium leading-6 rounded-md"
        :class="[
          index === selectedTab
            ? 'text-[--app-primary-200] bg-[--app-primary-800]'
            : 'text-[--app-primary-text]',
        ]"
      >
        {{ item.label }}
      </button>
    </div>
    <button
      @click="handleShowModal(undefined)"
      type="button"
      class="inline-flex items-center justify-center py-[13px] px-7 bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] rounded-md text-base font-medium leading-6"
    >
      Tambah SOP
    </button>
  </div>
  <ProgressLink
    :href="
      selectedTab === 0
        ? '/dashboard/management-sop/mandor?tanggal=' + today
        : '/dashboard/management-sop/anak-kandang?tanggal=' + today
    "
    :text="
      selectedTab === 0
        ? 'Cek progress SOP Mandor'
        : 'Cek progress SOP Anak Kandang'
    "
  />
  <template v-if="selectedTab === 0">
    <MandorSOPTemplate @handle-select-item="(item) => handleShowModal(item)" />
  </template>
  <template v-else-if="selectedTab === 1">
    <AnakKandangSOPTemplate
      @handle-select-item="(item) => handleShowModal(item)"
    />
  </template>

  <AppModal v-model="showModal">
    <ManagementSOPForm
      :defaultFormValue="selectedItem"
      :is-loading="isLoading"
      @handle-close-modal="handleCloseModal"
      @handle-success-add-data="(data) => handleSubmitForm(data)"
    />
  </AppModal>
</template>

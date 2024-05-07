<script setup lang="ts">
import type { ManagementSOP } from "~/types/sop";

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
const DUMMY = ref<Array<ManagementSOP>>([
  {
    id: "1",
    sop: "Cek sampling ayam (ayam ngorok, cekrek, sakit dll)",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
  {
    id: "2",
    sop: "Cek keberishan pipa minum (kebersihan dan kondisi pipa)",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
  {
    id: "3",
    sop: "Cek pipa makanan (ketebalan makanan & keberihan)",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
  {
    id: "4",
    sop: "Cek stock pakan dan obat-obatan",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
  {
    id: "5",
    sop: "Cek sanitasi air dan filter air",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
  {
    id: "6",
    sop: "Cek bio security dan kebersihan lingkungan",
    user: "Mandor",
    time: "06.00 - 08.00",
  },
]);
const showAddModal = ref(false);
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
      @click="showAddModal = true"
      type="button"
      class="inline-flex items-center justify-center py-[13px] px-7 bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] rounded-md text-base font-medium leading-6"
    >
      Tambah SOP
    </button>
  </div>
  <ProgressLink
    :href="
      selectedTab === 0
        ? '/dashboard/management-sop/mandor'
        : '/dashboard/management-sop/anak-kandang'
    "
    :text="
      selectedTab === 0
        ? 'Cek progress SOP Mandor'
        : 'Cek progress SOP Anak Kandang'
    "
  />
  <ManagementSOPTable :items="DUMMY" :active-tab="items[selectedTab]?.label" />

  <AppModal v-model="showAddModal">
    <ManagementSOPForm
      @handle-close-modal="showAddModal = false"
      @handle-success-add-data="(data) => console.log(data)"
    />
  </AppModal>
</template>

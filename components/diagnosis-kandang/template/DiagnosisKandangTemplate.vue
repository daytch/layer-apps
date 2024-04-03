<script setup lang="ts">
import { type DiagnosisKandang } from "~/types/report";
const { showFormModal } = useAddReportModal();

const DUMMY_DATA = ref<Array<DiagnosisKandang>>([
  {
    id: "1",
    cageName: "Kandang Jatisari",
    cageID: "100000051",
    date: new Date(),
    reporter: "AHMAD ROZIKIN",
    diseaseHistory: "Ayam Stres",
    medicationAdministered: "Stres Blok",
    progress: "UNHANDLED",
  },
  {
    id: "2",
    cageName: "Kandang Jatisari",
    cageID: "100000051",
    date: new Date(),
    reporter: "AHMAD ROZIKIN",
    diseaseHistory: "Ayam Stres",
    medicationAdministered: "Stres Blok",
    progress: "HANDLED",
  },
]);
</script>

<template>
  <DashboardContainer>
    <div class="p-4 border rounded">
      <UButton
        @click="showFormModal = true"
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
        Tambah Data
      </UButton>
    </div>
    <div class="py-6">
      <p
        class="text-[#1D2433] font-medium text-sm leading-[22px] mb-6 lg:text-base"
      >
        Nama Kandang
      </p>
      <ReportCollapse :reports="DUMMY_DATA" />
    </div>
  </DashboardContainer>
  <AddReportModal />
</template>

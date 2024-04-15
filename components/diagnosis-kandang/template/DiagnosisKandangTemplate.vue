<script setup lang="ts">
import { type DiagnosisKandang } from "~/types/report";
import type { SelectOptionType } from "~/types/ui";

const {
  showModal: showAddReportModal,
  handleCloseModal: handleCloseReportModal,
  handleShowModal: handleShowReportModal,
} = useModalForm<any>();

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
    doses: undefined,
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
    doses: undefined,
  },
]);
const EMPLOYEE_OPTIONS = [
  { label: "AHMAD ROZIKIN", value: "ahmad-rozikin" },
  { label: "TATAK", value: "tatak" },
];
const employe = ref<SelectOptionType | undefined>(undefined);
</script>

<template>
  <DashboardContainer>
    <DateRangeFilter
      :show-add-button="true"
      :add-button-text="'Tambah Laporan'"
      @handle-add-data="handleShowReportModal(undefined)"
    >
      <template v-slot:additional>
        <UInputMenu
          size="md"
          :nullable="true"
          v-model="employe"
          :options="EMPLOYEE_OPTIONS"
          placeholder="Pilih Pekerja"
          :input-class="'input-select-trigger'"
        />
      </template>
    </DateRangeFilter>

    <ReportTable :reports="DUMMY_DATA" />
  </DashboardContainer>
  <AppModal v-model="showAddReportModal">
    <AddReportForm
      @handle-close-modal="handleCloseReportModal"
      @handle-add-report="(data) => console.log(data)"
    />
  </AppModal>
</template>

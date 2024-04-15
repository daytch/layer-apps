<script setup lang="ts">
import type { DiagnosisKandang } from "~/types/report";
const columns = [
  "ID Kandang",
  "Nama Kandang",
  "Tanggal",
  "Pelapor",
  "Riwayat Penyakit",
  "Obat yg diberikan",
  "Dosis Obat",
  "Progress",
];

defineProps<{
  reports: DiagnosisKandang[];
}>();

const {
  showModal: showHandleReportModal,
  selectedItem,
  handleShowModal: handleShowModalReport,
  handleCloseModal: handleCloseModalReport,
} = useModalForm<DiagnosisKandang>();
</script>

<template>
  <div class="w-full overflow-x-auto mt-8">
    <table class="w-full">
      <thead>
        <tr class="bg-[--app-gray-100]">
          <th
            v-for="column in columns"
            class="text-left p-2 text-sm font-medium leading-[22px] text-[--app-dark-900] whitespace-nowrap"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="report in reports"
          :class="{
            'bg-white even:bg-[--app-gray-100]': report?.progress === 'HANDLED',
            'bg-[--app-danger-600]': report?.progress === 'UNHANDLED',
          }"
        >
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ report?.cageID }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ report?.cageName }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ formatDate(report?.date, "dd MMM yyyy") }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 uppercase whitespace-nowrap"
          >
            {{ report?.reporter }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ report?.diseaseHistory }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ report?.medicationAdministered }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            {{ report?.doses }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-1 whitespace-nowrap"
          >
            <template v-if="report?.progress === 'HANDLED'">
              Sudah Lapor PPL
            </template>
            <button
              v-else
              @click="handleShowModalReport(report)"
              type="button"
              class="py-1 px-2 text-sm font-normal leading-[22px] text-center inline-flex items-center justify-center text-white rounded-md bg-[--app-primary-100] ring-1 ring-[--app-primary-100]"
            >
              Tangani
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pre>{{ JSON.stringify(selectedItem, null, 2) }}</pre>
  <AppModal v-model="showHandleReportModal">
    <ProcessReportForm
      @handle-close-modal="handleCloseModalReport"
      @handle-submit-form="(data) => console.log(data)"
    />
  </AppModal>
</template>

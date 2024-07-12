<script setup lang="ts">
import type {
  DiagnosisKandangPayload,
  DiagnosisKandangType,
} from "~/types/report";
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
  reports: Array<DiagnosisKandangType>;
  isLoading?: boolean;
}>();

const { isLoading: isLoadingUpdate, updateDiagnosisKandangById } =
  useFetchDiagnosisKandang();
const {
  showModal: showHandleReportModal,
  handleCloseModal: handleCloseReportModal,
  handleShowModal: handleShowReportModal,
  selectedItem: selectedReport,
} = useModalForm<DiagnosisKandangType>();

const handleUpdateReport = (payload: DiagnosisKandangPayload) => {
  if (!selectedReport.value?.id) return;
  updateDiagnosisKandangById(selectedReport.value.id, payload).then((data) => {
    if (!!data?.id) {
      handleCloseReportModal();
    }
  });
};
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
        <tr v-if="isLoading">
          <td
            :colspan="columns.length"
            class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
          >
            <LoadingSpinner />
          </td>
        </tr>
        <tr
          v-for="report in reports"
          v-else-if="!isLoading && !!reports?.length"
          :class="{
            'bg-white even:bg-[--app-gray-100]': !!report?.progres?.length,
            'bg-[--app-danger-600]': !report?.progres?.length,
          }"
        >
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ report?.coop_id }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ report?.coop_name }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ formatDate(report?.trans_date, "dd MMM yyyy") }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 uppercase whitespace-nowrap"
          >
            {{ report?.reporter }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ report?.disease }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ report?.medicine ?? "-" }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            {{ report?.dose ?? "-" }}
          </td>
          <td
            class="text-sm font-normal leading-[22px] text-[--app-dark-900] px-2 py-2 whitespace-nowrap"
          >
            <button
              v-if="
                !report?.progres?.length ||
                report?.progres?.toLowerCase().includes('belum')
              "
              @click="handleShowReportModal(report)"
              type="button"
              class="py-1 px-2 text-sm font-normal leading-[22px] text-center inline-flex items-center justify-center text-white rounded-md bg-[--app-primary-100] ring-1 ring-[--app-primary-100]"
            >
              Tangani
            </button>

            <template v-else>
              {{ report?.progres }}
            </template>
          </td>
        </tr>
        <tr v-else>
          <td
            :colspan="columns.length"
            class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center border border-t-0"
          >
            <NoDataStatus>Data Cashflow Tidak Ditemukan</NoDataStatus>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AppModal v-model="showHandleReportModal" :transition="false">
    <ProcessReportForm
      :is-loading="isLoadingUpdate"
      @handle-close-modal="handleCloseReportModal"
      @handle-submit-form="handleUpdateReport"
    />
  </AppModal>
</template>

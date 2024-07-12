<script setup lang="ts">
import { UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import type {
  DiagnosisKandangPayload,
  DiagnosisKandangType,
} from "~/types/report";

const props = defineProps<{
  allDiagnosisKandang: Array<DiagnosisKandangType>;
  isLoading?: boolean;
}>();
defineEmits<{
  (e: "handleShowAddModal"): void;
}>();

const accordionData = computed(() =>
  props.allDiagnosisKandang.map((d) => ({
    ...d,
    label: d.coop_name,
    content: "",
  }))
);
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
  <div class="p-4 bg-white border border-[--app-gray-400] rounded-lg mb-4">
    <UButton
      @click="$emit('handleShowAddModal')"
      type="button"
      color="primary"
      :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
      >Tambah Data</UButton
    >
  </div>
  <div class="bg-white">
    <template v-if="isLoading">
      <LoadingSpinner />
    </template>
    <template v-else-if="!!allDiagnosisKandang.length">
      <UAccordion
        open-icon="i-heroicons-plus"
        close-icon="i-heroicons-minus"
        :items="accordionData"
        :ui="{ wrapper: 'flex flex-col w-full', item: { padding: 'p-0' } }"
      >
        <template #default="{ item, open }">
          <button
            type="button"
            class="inline-flex px-2 py-[10px] items-center space-x-2"
            :class="
              item?.progres?.toLowerCase()?.includes('sudah')
                ? 'bg-white'
                : 'bg-[--app-danger-600]'
            "
          >
            <UIcon
              v-if="open"
              class="w-[22px] h-[22px]"
              name="i-heroicons-minus-circle"
              :class="
                item?.progres?.toLowerCase()?.includes('sudah')
                  ? 'text-[--app-primary-100]'
                  : 'text-red-500'
              "
            />
            <UIcon
              v-else
              name="i-heroicons-plus-circle"
              class="w-[22px] h-[22px]"
              :class="
                item?.progres?.toLowerCase()?.includes('sudah')
                  ? 'text-[--app-primary-100]'
                  : 'text-red-500'
              "
            />
            <span class="inline-block">{{ item?.label }}</span>
          </button></template
        >
        <template #item="{ item }">
          <ReportCard
            :report="item"
            @handle-show-handle-report="
              (report) => handleShowReportModal(report)
            "
          />
        </template>
      </UAccordion>
    </template>
    <template v-else>
      <NoDataStatus>Data Diagnosa Tidak Ditemukan.</NoDataStatus>
    </template>
  </div>
  <AppModal v-model="showHandleReportModal" :transition="false">
    <ProcessReportForm
      :is-loading="isLoadingUpdate"
      @handle-close-modal="handleCloseReportModal"
      @handle-submit-form="handleUpdateReport"
    />
  </AppModal>
</template>

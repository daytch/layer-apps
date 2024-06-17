<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { DiagnosisKandangPayload, DiagnosisKandangType } from "~/types/report";

const {
  getAllDianosisKandang,
  isLoading: isLoadingForm,
  createNewDiagnosisKandang,
} = useFetchDiagnosisKandang();
const authUser = useAuthUser();
const { queryParams } = useQueryParams();
const { data: allDianosisKandang, pending: isLoading } = await useAsyncData(
  ASYNC_KEY.DIAGNOSIS_KANDANG,
  async () =>
    getAllDianosisKandang({
      userId: queryParams.value["userId"]?.length ? Number(queryParams.value["userId"]) : undefined,
      from: queryParams.value["from"]?.toString(),
      to: queryParams.value["to"]?.toString(),
    }),
  {
    lazy: true,
    watch: [queryParams],
  }
);

const roleName = computed(() => (authUser.value?.user?.role_name ?? "").toLocaleLowerCase());

const {
  showModal: showAddReportModal,
  handleCloseModal: handleCloseReportModal,
  handleShowModal: handleShowReportModal,
} = useModalForm<DiagnosisKandangType>();

const handleAddNewReport = (payload: DiagnosisKandangPayload) => {
  createNewDiagnosisKandang(payload).then((data) => {
    if (!!data?.id) {
      handleCloseReportModal();
    }
  });
};
</script>

<template>
  <template v-if="roleName.includes('admin')">
    <DiagnosisKandangAdminTemplate
      :all-dianosis-kandang="allDianosisKandang || []"
      :is-loading="isLoading"
      @handle-show-add-modal="handleShowReportModal(undefined)"
    />
  </template>
  <template v-else-if="roleName.includes('mandor')">
    <DiagnosisKandangMandorTemplate
      @handle-show-add-modal="handleShowReportModal(undefined)"
      :all-diagnosis-kandang="allDianosisKandang || []"
      :is-loading="isLoading"
    />
  </template>
  <AppModal v-model="showAddReportModal">
    <AddReportForm
      :is-loading="isLoadingForm"
      @handle-close-modal="handleCloseReportModal"
      @handle-add-report="handleAddNewReport"
    />
  </AppModal>
</template>

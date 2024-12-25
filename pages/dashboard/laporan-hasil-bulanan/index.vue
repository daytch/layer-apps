<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Laporan Hasil Bulanan | Layer Apps",
  description: "Laporan Hasil Bulanan | Layer Apps",
});

const { showModal, handleShowModal } = useModalForm<any>();
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Laporan Hasil Bulanan</DashboardHeadingTitle>
      <MonthlyReportTab>
        <template #child>
          <div class="mb-[14px]">
            <MonthlyReportFilter
              @handle-show-modal="handleShowModal(undefined)"
            />
          </div>
          <FinalResultTemplate />
        </template>
      </MonthlyReportTab>
    </DashboardContainer>
  </div>
  <AppModal v-model:model-value="showModal">
    <AddMonthlyReportForm @handle-hide-modal="showModal = false" />
  </AppModal>
</template>

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
const filterState = reactive({
  range: undefined,
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Laporan Hasil Bulanan</DashboardHeadingTitle>
      <MonthlyReportTab>
        <template #child>
          <div class="mb-[14px]">
            <DateRangeFilter
              v-model:model-value="filterState.range"
              containerClass="bg-white rounded-lg"
              :show-add-button="true"
              :add-button-text="'Tambah Laporan'"
              @handle-add-data="handleShowModal(undefined)"
            >
              <template #additional>
                <UInput
                  icon="i-heroicons-magnifying-glass-20-solid"
                  size="md"
                  color="white"
                  :trailing="false"
                  placeholder="Masukkan ID Pelanggan"
                  :ui="{
                    padding: {
                      md: 'py-3',
                    },
                    size: {
                      md: 'text-base',
                    },
                  }"
                />
              </template>
            </DateRangeFilter>
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

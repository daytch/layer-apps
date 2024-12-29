<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Detail Laporan Hasil Bulanan | Layer Apps",
  description: "Detail Laporan Hasil Bulanan | Layer Apps",
});
const { downloadData, isLoading } = useMonthlyReport();
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <div
        class="space-y-4 md:flex md:justify-between md:items-center md:space-x-4 md:space-y-0 mb-8"
      >
        <DashboardHeadingTitle style="margin-bottom: 0"
          >Detail</DashboardHeadingTitle
        >
        <div class="flex items-center space-x-3">
          <NuxtLink
            href="/dashboard/laporan-hasil-bulanan"
            class="inline-flex items-center justify-center text-center min-w-[117px] py-3 px-4 bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] rounded-md flex-1 md:flex-auto"
            >Kembali</NuxtLink
          >
          <UButton
            @click="downloadData"
            type="button"
            :disabled="isLoading"
            size="md"
            :ui="{
              strategy: 'override',
              base: 'text-center min-w-[92px] flex-1 md:flex-auto',
              padding: {
                md: 'py-3 px-4',
              },
              inline: 'inline-flex items-center justify-center',
              color: {
                primary: {
                  solid:
                    'bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
                },
              },
            }"
          >
            {{ isLoading ? "Mengunduh" : "Lihat Detail" }}
          </UButton>
        </div>
      </div>
      <MonthlyResultDetailTemplate />
    </DashboardContainer>
  </div>
</template>

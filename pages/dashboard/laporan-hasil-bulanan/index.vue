<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Laporan Hasil Bulanan | Layer Apps",
  description: "Laporan Hasil Bulanan | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Laporan Hasil Bulanan</DashboardHeadingTitle>
      <MonthlyReportTab>
        <template #child="{ activeKey }">
          <template v-if="activeKey === 'hasil-akhir'">
            <FinalResultTemplate />
          </template>
        </template>
      </MonthlyReportTab>
    </DashboardContainer>
  </div>
</template>

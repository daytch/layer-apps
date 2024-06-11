<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Grafik FCR | Layer Apps",
  description: "Grafik FCR | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Grafik FCR</DashboardHeadingTitle>
      <GrafikChartFilter />
      <FCRChart :fcr-data="[]" />
    </DashboardContainer>
  </div>
</template>

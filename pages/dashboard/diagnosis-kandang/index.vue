<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Diagnosis Kandang | Layer Apps",
  description: "Diagnosis Kandang | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Diagnosis Kandang</DashboardHeadingTitle>
      <DiagnosisKandangTemplate />
    </DashboardContainer>
  </div>
</template>

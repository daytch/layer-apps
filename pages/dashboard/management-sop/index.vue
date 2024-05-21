<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "SOP Kandang | Layer Apps",
  description: "SOP Kandang | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <h1 class="text-2xl font-semibold text-black leading-[30px] mb-4">
        SOP Kandang
      </h1>
      <ManagementSOPTemplate />
    </DashboardContainer>
  </div>
</template>

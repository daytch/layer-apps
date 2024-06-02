<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Produksi Telur | Layer Apps",
  description: "Produksi Telur | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px]">
    <DashboardContainer>
      <DashboardHeadingTitle style="margin-top: 40px; margin-bottom: 16px"
        >Produksi Telur</DashboardHeadingTitle
      >
      <ProduksiTelurTemplate />
    </DashboardContainer>
  </div>
</template>

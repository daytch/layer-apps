<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Produksi Telur | Layer Apps",
  description: "Produksi Telur | Layer Apps",
});
const visibleColumns = ref([
  "all",
  "date",
  "age_day",
  "age_week",
  "pop",
  "m",
  "afk",
  "sell",
  "last_pop",
]);
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

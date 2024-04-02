<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Stok Makan & Obat | Layer Apps",
  description: "Stok Makan & Obat | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-white">
    <FoodMedicineStockTemplate />
  </div>
</template>

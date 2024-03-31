<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Dashboard | Layer Apps",
  description: "Dashboard | Layer Apps",
});
</script>

<template>
  <div class="py-[14px] lg:py-[36px] space-y-[14px] lg:space-y-8">
    <AdminDashboardIndexTemplate />
  </div>
</template>

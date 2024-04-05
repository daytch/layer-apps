<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Manajemen User | Layer Apps",
  description: "Manajemen User | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <ManagementUserTemplate />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Progress SOP Anak Kandang | Layer Apps",
  description: "Progress SOP Anak Kandang | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-9 bg-[--app-gray-200]">
    <ProgressAnakKandangTemplate
      :title="'Cek progress SOP Anak Kandang'"
      :back-link="'/dashboard/management-sop?tab=Anak+Kandang'"
    />
  </div>
</template>

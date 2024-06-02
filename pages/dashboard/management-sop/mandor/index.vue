<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Progress SOP Mandor | Layer Apps",
  description: "Progress SOP Mandor | Layer Apps",
});
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-9 bg-[--app-gray-200]">
    <ProgressAnakKandangTemplate
      :title="'Cek progress SOP Mandor'"
      :back-link="'/dashboard/management-sop?tab=Mandor'"
    />
  </div>
</template>

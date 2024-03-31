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
  <!-- ADMIN/SUPERADMIN -->
  <!-- <AdminDashboardIndexTemplate /> -->
  <!-- END ADMIN/SUPERADMIN -->
  <!-- MANDOR -->
  <!-- <ForemanDashboardIndexTemplate /> -->
  <!-- END MANDOR -->
  <!-- MEMBER -->
  <MemberDashboardIndexTemplate />
  <!-- END MEMBER -->
</template>

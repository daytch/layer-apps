<script setup lang="ts">
import type { RoleType } from "~/types/dashboard-menu";

definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Dashboard | Layer Apps",
  description: "Dashboard | Layer Apps",
});
const ROLE = ref<RoleType>("ADMIN");
</script>

<template>
  <template v-if="ROLE === 'ADMIN' || ROLE === 'SUPERADMIN'">
    <!-- ADMIN/SUPERADMIN -->
    <AdminDashboardIndexTemplate />
    <!-- END ADMIN/SUPERADMIN -->
  </template>
  <template v-else-if="ROLE === 'MANDOR'">
    <!-- MANDOR -->
    <!-- <ForemanDashboardIndexTemplate /> -->
    <!-- END MANDOR -->
  </template>
  <template v-else>
    <!-- MEMBER -->
    <!-- <MemberDashboardIndexTemplate /> -->
    <!-- END MEMBER -->
  </template>
</template>

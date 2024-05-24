<script setup lang="ts">
import type { RoleType } from "~/types/dashboard-menu";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Dashboard | Layer Apps",
  description: "Dashboard | Layer Apps",
});
const authUser = useAuthUser();
</script>

<template>
  <template
    v-if="
      authUser?.user?.role_name === 'Admin' ||
      authUser?.user?.role_name === 'Superadmin'
    "
  >
    <!-- ADMIN/SUPERADMIN -->
    <AdminDashboardIndexTemplate />
    <!-- END ADMIN/SUPERADMIN -->
  </template>
  <template v-else-if="authUser?.user?.role_name === 'Mandor'">
    <!-- MANDOR -->
    <ForemanDashboardIndexTemplate />
    <!-- END MANDOR -->
  </template>
</template>

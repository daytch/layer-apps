<script setup lang="ts">
import { DASHBOARD_MENU } from "~/constants/dashboard";

const { isSidebarExpanded } = useDashboardSidebar();
</script>

<template>
  <div class="flex overflow-hidden min-h-screen bg-[--app-gray-200]">
    <DashboardPCSidebar :menus="DASHBOARD_MENU || []" />
    <div
      class="flex-1 transition-all"
      :class="
        isSidebarExpanded
          ? 'lg:ml-[--sidebar-width]'
          : 'lg:ml-[--sidebar-collapse-width]'
      "
    >
      <DashboardTopBar />
      <slot />
    </div>
  </div>
  <DashboardSPSidebar :menus="DASHBOARD_MENU || []" />
  <DashboardSPNotification />
</template>

<script setup lang="ts">
import { DASHBOARD_MENU, DASHBOARD_MENU_SP } from "~/constants/dashboard";

const { isSidebarExpanded } = useDashboardSidebar();
</script>

<template>
  <div class="flex overflow-x-hidden min-h-screen bg-[--app-gray-200]">
    <DashboardPCSidebar :menus="DASHBOARD_MENU || []" />
    <div
      class="flex-1 transition-all content-width"
      :class="
        isSidebarExpanded
          ? 'lg:ml-[--sidebar-width] lg-content-width-expanded'
          : 'lg:ml-[--sidebar-collapse-width] lg-content-width-not-expanded'
      "
    >
      <DashboardTopBar />
      <slot />
    </div>
  </div>
  <DashboardSPSidebar :menus="DASHBOARD_MENU_SP || []" />
  <DashboardSPNotification />
</template>

<style>
.content-width {
  max-width: 100vw;
}
@media (min-width: 1024px) {
  .lg-content-width-expanded {
    max-width: calc(100vw - var(--sidebar-width));
  }
  .lg-content-width-not-expanded {
    max-width: calc(100vw - var(--sidebar-collapse-width));
  }
}
</style>

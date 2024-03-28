<script setup lang="ts">
import type { Menu } from "~/types/dashboard-menu";

defineProps<{ menus: Menu[] }>();
const { isSidebarExpanded } = useDashboardSidebar();
</script>
<template>
  <div
    class="hidden lg:flex flex-col transition-all bg-[--app-primary-100] h-screen fixed top-0 left-0"
    :class="{
      'w-[--sidebar-width]': isSidebarExpanded,
      'w-[--sidebar-collapse-width]': !isSidebarExpanded,
    }"
  >
    <DashboardItem :menus="menus" :is-sidebar-expanded="isSidebarExpanded" />
  </div>
</template>

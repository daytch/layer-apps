<script setup lang="ts">
import type { Menu } from "~/types/dashboard-menu";

defineProps<{ menus: Menu[] }>();
const { isSidebarSliderOpen } = useDashboardSidebar();
</script>

<template>
  <USlideover
    v-model="isSidebarSliderOpen"
    side="left"
    :ui="{
      width: 'w-screen max-w-[317px]',
      background: 'bg-[--app-primary-100]',
    }"
  >
    <div class="flex-1 h-screen flex flex-col">
      <DashboardItem :menus="menus" :is-sidebar-expanded="true" />
    </div>
  </USlideover>
</template>

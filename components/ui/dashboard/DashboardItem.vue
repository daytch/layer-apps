<script setup lang="ts">
import type { Menu } from "~/types/dashboard-menu";

defineProps<{
  isSidebarExpanded: boolean;
  menus: Menu[];
}>();

const isAdmin = useAdmin();
</script>

<template>
  <div class="h-[--header-dashboard-height] pt-10 pl-10 pr-4 mb-6">
    <IconLogoLayerAppsByCokroFarmFull v-if="isSidebarExpanded" />
    <IconLogoLayerAppsByCokroFarm v-else />
  </div>

  <div class="flex-1 flex flex-col">
    <ul class="pr-4 overflow-x-hidden overflow-y-auto flex-1 max-h-[70vh]">
      <template v-for="(menu, index) in menus" :key="index">
        <li
          v-if="
            isAdmin &&
            (menu?.roles?.includes('Admin') ||
              menu?.roles?.includes('Superadmin'))
          "
        >
          <DashboardSidebarLink
            :text="menu.text"
            :icon="menu.icon"
            :roles="menu.roles"
            :is-active="index === 0"
            :is-show-full-menu="isSidebarExpanded"
            :to="menu.to"
          />
        </li>
      </template>
    </ul>
    <button
      type="button"
      class="inline-flex items-center py-[18px] pl-10 pr-4 text-lg font-medium leading-6 w-full rounded-tr-[12px] rounded-br-[12px] relative mb-8"
    >
      <IconLogout />
      <p class="ml-6 text-[#C2F3D6]" v-if="isSidebarExpanded">Keluar</p>
    </button>
  </div>
</template>

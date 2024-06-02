<script setup lang="ts">
import type { Menu } from "~/types/dashboard-menu";

type Props = {
  isShowFullMenu: boolean;
  isActive: boolean;
} & Menu;

defineProps<Props>();
</script>

<template>
  <NuxtLink
    active-class="bg-[--app-gray-100] text-[--app-primary-100] fill-[#22AD5C] active-link"
    :to="to"
    class="inline-flex items-center py-[18px] pl-10 pr-4 text-lg font-medium leading-6 w-full rounded-tr-[12px] rounded-br-[12px] relative group text-[#C2F3D6] dashboard-link"
  >
    <div
      v-if="isActive"
      class="absolute top-0 bottom-0 left-0 w-[6px] bg-[--app-primary-100] rounded-tr-[10px] rounded-br-[10px]"
    />
    <component :is="icon" />
    <p class="ml-6 text-inherit" v-if="isShowFullMenu">
      {{ text }}
    </p>
  </NuxtLink>
</template>

<style>
.dashboard-link.active-link svg path {
  @apply !fill-[#22AD5C];
}
.dashboard-link svg path {
  @apply !fill-[#C2F3D6];
}
</style>

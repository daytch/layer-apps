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
    to="/"
    class="inline-flex items-center py-[18px] pl-10 pr-4 text-lg font-medium leading-6 w-full rounded-tr-[12px] rounded-br-[12px] relative group"
    :class="{
      'bg-[--app-gray-100]': isActive,
    }"
  >
    <div
      v-if="isActive"
      class="absolute top-0 bottom-0 left-0 w-[6px] bg-[--app-primary-100] rounded-tr-[10px] rounded-br-[10px]"
    />
    <component :is="icon" :fill="isActive ? '#22AD5C' : '#C2F3D6'" />
    <p
      class="ml-6"
      v-if="isShowFullMenu"
      :class="isActive ? 'text-[--app-primary-100]' : 'text-[#C2F3D6]'"
    >
      {{ text }}
    </p>
  </NuxtLink>
</template>

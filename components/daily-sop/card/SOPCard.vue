<script setup lang="ts">
import type { RoleType } from "~/types/dashboard-menu";
type Role = Extract<RoleType, "Anak Kandang" | "Mandor">;
defineProps<{
  role: Role;
  activity: string;
  time: string;
  isDone: boolean;
  id: string;
}>();

const { handleSelectSOPItem } = useSelectSOP();
</script>

<template>
  <div class="p-4 rounded-[14px] border border-[--app-dark-800]">
    <p class="text-sm font-normal leading-[22px] text-[--app-dark-500]">
      {{ role === "Mandor" ? "Mandor" : "Anak Kandang" }}
    </p>
    <h4 class="text-lg font-bold leading-[27px] mb-6">{{ activity }}</h4>
    <p class="text-xs font-normal leading-5 text-[--app-dark-500] mb-5">
      {{ time }} WIB
    </p>
    <UButton
      @click="() => handleSelectSOPItem({ id, isDone, time, title: activity })"
      type="button"
      :disabled="isDone"
      block
      size="md"
      :ui="{
        strategy: 'override',
        base: 'uppercase',
        padding: {
          md: 'py-[13px] px-7',
        },
        color: {
          primary: {
            solid:
              'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
          },
        },
      }"
    >
      {{ isDone ? "SELESAI" : "LAKUKAN" }}
    </UButton>
  </div>
</template>

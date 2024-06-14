<script setup lang="ts">
import type { RoleType } from "~/types/dashboard-menu";
import type { SOPDataType } from "~/types/sop";
type Role = Extract<RoleType, "Anak Kandang" | "Mandor">;

defineProps<{
  role: Role;
  sopItem: SOPDataType;
}>();

defineEmits<{ (e: "handleSelectItem", sopItem: SOPDataType): void }>();
</script>

<template>
  <div class="p-4 rounded-[14px] border border-[--app-dark-800] flex flex-col">
    <div class="flex-1">
      <p class="text-sm font-normal leading-[22px] text-[--app-dark-500]">
        {{ role }}
      </p>
      <h4 class="text-lg font-bold leading-[27px] mb-6">{{ sopItem.title }}</h4>
      <p class="text-xs font-normal leading-5 text-[--app-dark-500] mb-5">
        {{ sopItem.time }}
      </p>
    </div>
    <UButton
      type="button"
      @click="$emit('handleSelectItem', sopItem)"
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
      LAKUKAN
      <!-- {{ isDone ? "SELESAI" : "LAKUKAN" }} -->
    </UButton>
  </div>
</template>

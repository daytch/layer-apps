<script setup lang="ts">
import { UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import type { RoleType } from "~/types/dashboard-menu";
import type { SOPByUserDataType } from "~/types/sop";
type Role = Extract<RoleType, "Anak Kandang" | "Mandor">;

defineProps<{
  role: Role;
  sopItem: SOPByUserDataType;
}>();

defineEmits<{ (e: "handleSelectItem", sopItem: SOPByUserDataType): void }>();
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
      :disabled="sopItem.status"
      @click="$emit('handleSelectItem', sopItem)"
      block
      size="md"
      :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
    >
      {{ sopItem.status ? "SELESAI" : "LAKUKAN" }}
    </UButton>
  </div>
</template>

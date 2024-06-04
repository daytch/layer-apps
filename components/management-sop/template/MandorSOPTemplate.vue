<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { SOPDataType } from "~/types/sop";

defineEmits<{ (e: "handleSelectItem", sopItem: SOPDataType): void }>();

const { getAllSopsByRoleId } = useFetchSOP();
const { data, pending } = await useAsyncData(
  ASYNC_KEY.SOP_MANDOR,
  async () => getAllSopsByRoleId(3),
  {
    lazy: true,
  }
);
</script>

<template>
  <ManagementSOPTable
    :pending="pending"
    :sop-items="data || []"
    @handle-select-item="(sopItem) => $emit('handleSelectItem', sopItem)"
  />
</template>

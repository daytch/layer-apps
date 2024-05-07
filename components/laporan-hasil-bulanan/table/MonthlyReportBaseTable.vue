<script setup lang="ts">
defineProps<{
  headerColumns: Array<{
    label: string;
    key: string;
  }>;
}>();
</script>

<template>
  <div class="w-full overflow-auto monthly-report-table bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="header in headerColumns"
            class="text-left py-[18px] px-4 whitespace-nowrap text-base font-medium leading-6 text-[--app-dark-900]"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="content" />
      </tbody>
    </table>
  </div>
</template>

<style>
.monthly-report-table tbody tr {
  @apply border-b border-[--app-gray-500];
}
.monthly-report-table tbody td {
  @apply p-4 text-sm font-normal leading-[22px] text-[--app-dark-100];
}
</style>

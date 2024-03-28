<script setup lang="ts">
const { isNotificationSliderOpen } = useDashboardSidebar();
</script>

<template>
  <USlideover
    v-model="isNotificationSliderOpen"
    side="right"
    :ui="{
      width: 'w-screen max-w-[317px]',
      background: 'bg-white',
    }"
  >
    <div class="flex-1 h-screen flex flex-col">
      <DashboardNotificationList />
    </div>
  </USlideover>
</template>

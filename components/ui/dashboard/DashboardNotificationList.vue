<script setup lang="ts">
import type { NotificationDataType } from "~/types/notification";
defineProps<{
  notifications: Array<NotificationDataType>;
  isLoading?: boolean;
}>();
</script>
<template>
  <div class="w-full p-6">
    <h2 class="text-[--app-dark-100] text-lg font-semibold leading-[26px] mb-6">
      Notifikasi
    </h2>
    <template v-if="isLoading">
      <div><LoadingSpinner /></div>
    </template>
    <ul class="space-y-6" v-else-if="!isLoading && !!notifications?.length">
      <template v-for="(notification, index) in notifications" :key="index">
        <NotificationCard :notification="notification" />
      </template>
    </ul>
    <template v-else>
      <div>Tidak ada notifikasi</div>
    </template>
  </div>
</template>

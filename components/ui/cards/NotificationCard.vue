<script setup lang="ts">
import type { NotificationDataType } from "~/types/notification";
const { isLoading, handleMarkAsDone } = useFetchNotification();
defineProps<{ notification: NotificationDataType }>();
</script>

<template>
  <li>
    <button
      type="button"
      @click="async () => handleMarkAsDone(notification.id)"
      :disabled="isLoading"
      class="flex justify-between items-start space-x-1 text-left"
    >
      <div class="flex-1">
        <p
          class="mb-1 font-semibold text-sm leading-[22px] text-[--app-dark-100]"
        >
          {{ notification?.reporter }}
        </p>
        <p
          class="mb-1 text-sm font-normal leading-[22px] text-[--app-dark-100]"
        >
          {{ notification?.message }}
        </p>
        <p class="text-xs leading-5 font-normal text-[#6B7280]">
          {{ formatDate(notification.createdAt, "dd MMMM yyyy") }}
          {{ formatDate(notification.createdAt, "hh.mm") }} WIB
        </p>
      </div>
      <div
        class="w-3 h-3 rounded-full"
        :class="{
          'bg-[--app-primary-100]': notification.isRead,
          'bg-[--app-danger-100]': !notification.isRead,
        }"
      />
    </button>
  </li>
</template>

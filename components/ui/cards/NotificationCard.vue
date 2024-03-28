<script setup lang="ts">
import type { AppNotification } from "~/types/notification";
type NotificationCardProps = {} & AppNotification;

defineProps<NotificationCardProps>();
</script>

<template>
  <div class="flex justify-between items-start space-x-1">
    <div class="flex-1">
      <p class="text-[--app-dark-100] text-sm font-medium leading-[22px] mb-4">
        {{ sender }}
      </p>
      <p class="text-xs text-[--app-primary-text] leading-5 mb-2">{{ text }}</p>
    </div>
    <div
      class="w-3 h-3 rounded-full"
      :class="{
        'bg-[--app-primary-100]': status === 'READ',
        'bg-[--app-danger-100]': status === 'UNREAD',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { AppNotification } from "~/types/notification";
const DUMMY_NOTIFICATION: AppNotification[] = [
  {
    sender: "Ahmad Rozikin",
    text: "Membuat laporan Diagnosis Kandang",
    status: "UNREAD",
  },
  {
    sender: "Ahmad Rozikin",
    text: "Membuat laporan Diagnosis Kandang",
    status: "READ",
  },
  {
    sender: "Ahmad Rozikin",
    text: "Membuat laporan Diagnosis Kandang",
    status: "UNREAD",
  },
];
</script>
<template>
  <div class="w-full p-6">
    <h2 class="text-[--app-dark-100] text-lg font-semibold leading-[26px] mb-6">
      Notifikasi
    </h2>
    <div class="space-y-6">
      <template
        v-for="(notification, index) in DUMMY_NOTIFICATION"
        :key="index"
      >
        <NotificationCard
          :sender="notification.sender"
          :text="notification.text"
          :status="notification.status"
        />
      </template>
    </div>
  </div>
</template>

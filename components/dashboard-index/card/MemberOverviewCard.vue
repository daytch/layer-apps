<script setup lang="ts">
import type { UserType } from "~/types/user";

defineProps<{ users: Array<UserType> }>();
</script>

<template>
  <div
    class="bg-white border border-[--app-gray-400] p-6 rounded-2xl min-h-[228px] overflow-hidden flex flex-col"
  >
    <div class="flex justify-between items-center mb-3">
      <p class="text-[--app-dark-500] leading-6 text-base">Anggota</p>
      <NuxtLink
        to="/dashboard/users"
        class="text-[--app-dark-500] leading-5 text-xs underline"
        >Detail</NuxtLink
      >
    </div>
    <template v-for="(member, index) in users.slice(0, 3)">
      <div
        class="flex items-ceter justify-between py-1 text-[--app-dark-100] space-x-1"
        :class="{
          'border-b border-b-[--app-gray-400]': index !== users.length - 1,
        }"
      >
        <p class="text-sm font-medium leading-[22px]">
          {{ member.name }}
        </p>
        <p class="text-xs font-normal leading-5">{{ member?.role_name }}</p>
      </div>
    </template>
    <div class="flex-1 flex items-end w-full mt-5">
      <p
        class="text-[-app-dark-500] text-xs leading-5 font-normal border-t border-t-[--app-gray-400] pt-3 w-full"
      >
        Total : {{ users?.length }} anggota
      </p>
    </div>
  </div>
</template>

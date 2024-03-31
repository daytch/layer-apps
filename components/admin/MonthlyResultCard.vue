<script setup lang="ts">
const monthlyResult: Array<{
  name: string;
  date?: string;
  money: number;
}> = [
  {
    name: "Ahmad Rozikin",
    date: "02 Jan 2023 - 30 Des 2023",
    money: 49232000,
  },
  {
    name: "Arif Setyawan",
    date: "02 Jan 2023 - 30 Des 2023",
    money: 49232000,
  },
  {
    name: "Hendra",
    money: 49232000,
  },
];
</script>
<template>
  <div
    class="bg-white border border-[--app-gray-400] p-6 rounded-2xl min-h-[228px] overflow-hidden"
  >
    <div class="flex justify-between items-center mb-3">
      <p class="text-[--app-dark-500] leading-6 text-base">Hasil Bulanan</p>
      <NuxtLink to="/" class="text-[--app-dark-500] leading-5 text-xs underline"
        >Detail</NuxtLink
      >
    </div>
    <template v-for="(monthly, index) in monthlyResult">
      <div
        class="pb-2 pt-1"
        :class="{
          'border-b border-b-[--app-gray-400]':
            index !== monthlyResult.length - 1,
        }"
      >
        <div class="flex justify-between items-start">
          <div>
            <p
              class="text-[--app-dark-100] text-sm font-medium leading-[22px] mb-1"
            >
              {{ monthly.name }}
            </p>
            <p
              v-if="monthly.date"
              class="text-[--app-dark-500] text-xs leading-5"
            >
              {{ monthly.date }}
            </p>
          </div>
          <p class="text-[--app-dark-100] text-xs leading-5">
            {{ formatMoney(monthly.money) }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

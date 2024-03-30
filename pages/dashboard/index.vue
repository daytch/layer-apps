<script setup lang="ts">
import { sub } from "date-fns";
definePageMeta({
  layout: "dashboard",
});
useSeoMeta({
  title: "Dashboard | Layer Apps",
  description: "Dashboard | Layer Apps",
});
const members: Array<{
  name: string;
  status: string;
}> = [
  {
    name: "Lukman",
    status: "Owner",
  },
  {
    name: "Setyawan",
    status: "Mandor",
  },
  {
    name: "Reynald",
    status: "Anak Kandang",
  },
];
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
const range = ref({ start: sub(new Date(), { days: 14 }), end: new Date() });
const period = ref("daily");
</script>

<template>
  <div class="py-[14px] lg:py-[36px] space-y-[14px] lg:space-y-8">
    <WelcomeCard />
    <DashboardContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          class="w-full relative p-6 bg-[--app-primary-100] rounded-2xl min-h-[228px] overflow-hidden flex flex-col justify-between"
        >
          <div>
            <p class="text-white text-base leading-6 mb-6 font-normal">
              Saldo Perusahaan
            </p>
            <p
              class="flex items-center text-white text-2xl font-medium leading-[30px] space-x-1"
            >
              <span class="inline-block">{{ formatMoney(500000000) }}</span>
              <UIcon name="i-heroicons-eye" />
            </p>
          </div>
          <div class="">
            <div class="border-t border-white pt-3">
              <p class="text-white text-xs leading-5">
                Terakhir diupdate : 20 Mar 2023
              </p>
            </div>
          </div>
          <IconBalance class="absolute bottom-0 -right-[23px]" />
        </div>
        <div
          class="bg-white border border-[--app-gray-400] p-6 rounded-2xl min-h-[228px] overflow-hidden"
        >
          <div class="flex justify-between items-center mb-3">
            <p class="text-[--app-dark-500] leading-6 text-base">
              Hasil Bulanan
            </p>
            <NuxtLink
              to="/"
              class="text-[--app-dark-500] leading-5 text-xs underline"
              >Detail</NuxtLink
            >
          </div>
          <template v-for="(monthly, index) in monthlyResult">
            <div
              class="pb-2 pt-1"
              :class="{
                'border-b border-b-[--app-gray-400]':
                  index !== members.length - 1,
              }"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p>{{ monthly.name }}</p>
                  <p v-if="monthly.date">{{ monthly.date }}</p>
                </div>
                <p>{{ formatMoney(monthly.money) }}</p>
              </div>
            </div>
          </template>
        </div>
        <div
          class="bg-white border border-[--app-gray-400] p-6 rounded-2xl min-h-[228px] overflow-hidden flex flex-col"
        >
          <div class="flex justify-between items-center mb-3">
            <p class="text-[--app-dark-500] leading-6 text-base">Anggota</p>
            <NuxtLink
              to="/"
              class="text-[--app-dark-500] leading-5 text-xs underline"
              >Detail</NuxtLink
            >
          </div>
          <template v-for="(member, index) in members">
            <div
              class="flex items-ceter justify-between py-1 text-[--app-dark-100] space-x-1"
              :class="{
                'border-b border-b-[--app-gray-400]':
                  index !== members.length - 1,
              }"
            >
              <p class="text-sm font-medium leading-[22px]">
                {{ member.name }}
              </p>
              <p class="text-xs font-normal leading-5">{{ member.status }}</p>
            </div>
          </template>
          <div class="flex-1 flex items-end w-full mt-5">
            <p
              class="text-[-app-dark-500] text-xs leading-5 font-normal border-t border-t-[--app-gray-400] pt-3 w-full"
            >
              Total : 18 anggota
            </p>
          </div>
        </div>
      </div>
    </DashboardContainer>
    <FCRChart :period="period as any" :range="range" />
  </div>
</template>

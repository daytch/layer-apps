<script setup lang="ts">
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
</script>

<template>
  <div
    class="bg-white border border-[--app-gray-400] p-6 rounded-2xl min-h-[228px] overflow-hidden flex flex-col"
  >
    <div class="flex justify-between items-center mb-3">
      <p class="text-[--app-dark-500] leading-6 text-base">Anggota</p>
      <NuxtLink to="/" class="text-[--app-dark-500] leading-5 text-xs underline"
        >Detail</NuxtLink
      >
    </div>
    <template v-for="(member, index) in members">
      <div
        class="flex items-ceter justify-between py-1 text-[--app-dark-100] space-x-1"
        :class="{
          'border-b border-b-[--app-gray-400]': index !== members.length - 1,
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
</template>

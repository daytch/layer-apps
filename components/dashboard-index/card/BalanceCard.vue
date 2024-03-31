<template>
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
</template>

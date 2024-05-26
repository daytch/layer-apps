<script setup lang="ts">
const authUser = useAuthUser();
</script>

<template>
  <div
    class="pt-[14px] px-4 lg:px-6 pb-4 bg-white -translate-y-[1px] relative z-[5]"
  >
    <div class="relative z-[5] text-white">
      <p class="text-lg leading-[26px] font-normal mb-2">Selamat Bekerja</p>
      <div class="flex items-center justify-between mb-6">
        <p class="text-2xl font-semibold leading-[30px]">
          {{ authUser?.user?.name }}
        </p>
        <div
          class="text-sm py-1 px-2 bg-[#F27430] rounded-[32px]"
          v-if="!!authUser?.user"
        >
          {{
            authUser?.user?.role_name === "Mandor" ? "Mandor" : "Anak Kandang"
          }}
        </div>
      </div>
      <div
        class="w-full max-w-[343px] py-3 px-[22px] rounded-lg bg-[--app-primary-700] mx-auto flex items-center"
      >
        <div
          class="inline-flex items-center justify-center w-5 h-5 bg-[--app-primary-100] rounded-full mr-3"
        >
          <UIcon name="i-heroicons-check-circle" class="w-3 h-3 text-white" />
        </div>
        <span
          class="inline-block text-sm font-normal leading-[22px] text-[#004434]"
          >Jangan lupa berdo’a sebelum bekerja</span
        >
      </div>
    </div>
    <div
      class="absolute top-0 left-0 right-0 h-[77%] bg-[--app-primary-100] z-[-1]"
    />
  </div>
</template>

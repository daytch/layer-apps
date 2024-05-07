<script lang="ts" setup>
defineProps<{
  backLink: string;
  title: string;
}>();
const date = ref<Date | undefined>(new Date());
</script>

<template>
  <DashboardContainer>
    <h1 class="text-2xl text-black font-semibold leading-[30px]">
      {{ title }}
    </h1>
    <div class="flex items-center flex-col md:flex-row md:justify-between mt-9">
      <NuxtLink
        :href="backLink"
        class="inline-flex items-center justify-center space-x-[14px] px-4 py-3 ring-1 ring-[--app-primary-100] text-[--app-primary-100] text-base font-medium rounded-md"
      >
        <UIcon
          name="i-heroicons-chevron-left-16-solid"
          class="w-5 h-5 text-[--app-primary-100]"
        />
        <span class="inline-block">Kembali</span>
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <Datepicker v-model:model-value="date" />
        <button
          type="button"
          class="inline-flex items-center justify-center space-x-[14px] px-4 py-3 ring-1 ring-[--app-primary-100] text-[--app-primary-100] text-base font-medium rounded-md"
        >
          Tampilkan
        </button>
      </div>
    </div>
    <ProgressTableSOP />
  </DashboardContainer>
</template>

<script setup lang="ts">
defineProps<{ href: string; text: string }>();
</script>

<template>
  <NuxtLink
    :href="href"
    class="flex items-center space-x-3 py-6 px-[14px] bg-white rounded-lg border border-[#DFE4EA] mt-6 group"
  >
    <UIcon
      name="i-heroicons-check-circle"
      class="w-6 h-6 text-[--app-primary-100]"
    />
    <span
      class="inline-block flex-1 text-base font-semibold text-black leading-6"
      >{{ text }}</span
    >
    <UIcon
      name="i-heroicons-chevron-right"
      class="w-6 h-6 text-[--app-dark-100] group-hover:translate-x-1 transition-all"
    />
  </NuxtLink>
</template>

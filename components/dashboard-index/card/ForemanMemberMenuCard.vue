<script setup lang="ts">
defineProps<{
  heading: string;
  description: string;
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="p-4 rounded-[14px] flex items-center justify-between space-x-4 border border-[--app-gray-400] group card-container"
  >
    <div>
      <slot name="icon">
        <div class="hidden" />
      </slot>
      <h4 class="text-black text-lg font-bold leading-[26px] mb-[25px]">
        {{ heading }}
      </h4>
      <p class="text-xs text-[--app-dark-500] font-normal leading-5">
        {{ description }}
      </p>
    </div>
    <UIcon
      name="i-heroicons-chevron-right"
      class="text-[--app-primary-100] w-6 h-6 group-hover:translate-x-1 transition-all"
    />
  </NuxtLink>
</template>

<style scoped>
.card-container {
  box-shadow: 0px 0px 10px 0px rgba(166, 175, 195, 0.3);
}
</style>

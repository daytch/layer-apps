<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications>
    <template #title="{ title }">
      <span v-html="title" class="text-base font-medium leading-6" />
    </template>
    <template #description="{ description }">
      <span v-html="description" class="hidden" />
    </template>
  </UNotifications>
</template>

<style>
body {
  @apply font-inter;
}
</style>

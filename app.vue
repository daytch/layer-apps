<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications>
    <template #title="{ title }">
      <span v-html="title" />
    </template>
    <template #description="{ description }">
      <span v-html="description" />
    </template>
  </UNotifications>
</template>

<style>
body {
  @apply font-inter;
}
</style>

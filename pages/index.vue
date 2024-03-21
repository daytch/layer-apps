<script setup lang="ts">
const toast = useToast();
</script>

<template>
  <UButton
    label="Show toast"
    @click="
      toast.add({
        title: 'Hello world!',
        ui: {
          progress: {
            base: 'absolute bottom-0 end-0 start-0 h-3',
            background: 'bg-emerald-500 dark:bg-emerald-400',
          },
          background: 'bg-red-500',
          title: 'text-white',
        },
        timeout: 100000,
      })
    "
  />
</template>

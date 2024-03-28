<script setup lang="ts">
defineProps<{
  text: string;
  icon: Component;
}>();
</script>

<template>
  <div>
    <component :is="icon" />
    <p>{{ text }}</p>
  </div>
</template>

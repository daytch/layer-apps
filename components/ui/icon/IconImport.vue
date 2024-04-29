<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    stroke?: string;
  }>(),
  {
    width: 18,
    height: 18,
    stroke: "white",
  }
);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
  >
    <path
      d="M6.99023 8.75977L8.91023 10.6798L10.8302 8.75977"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.91016 3V10.6275"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15 9.13477C15 12.4498 12.75 15.1348 9 15.1348C5.25 15.1348 3 12.4498 3 9.13477"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    stroke?: string;
  }>(),
  {
    width: 24,
    height: 25,
    stroke: "#292D32",
  }
);
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5H15C20 22.5 22 20.5 22 15.5V13.5"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16.0399 3.51976L8.15988 11.3998C7.85988 11.6998 7.55988 12.2898 7.49988 12.7198L7.06988 15.7298C6.90988 16.8198 7.67988 17.5798 8.76988 17.4298L11.7799 16.9998C12.1999 16.9398 12.7899 16.6398 13.0999 16.3398L20.9799 8.45976C22.3399 7.09976 22.9799 5.51976 20.9799 3.51976C18.9799 1.51976 17.3999 2.15976 16.0399 3.51976Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.9102 4.6499C15.5802 7.0399 17.4502 8.9099 19.8502 9.5899"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

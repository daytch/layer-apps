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
    stroke: "#637381",
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
      d="M16.4474 5.06976L13.9199 15.2173C13.7399 15.9748 13.0649 16.4998 12.2849 16.4998H2.42985C1.29735 16.4998 0.487365 15.3897 0.824865 14.3022L3.98236 4.16229C4.19986 3.45729 4.85237 2.96973 5.58737 2.96973H14.8124C15.5249 2.96973 16.1174 3.40473 16.3649 4.00473C16.5074 4.32723 16.5374 4.69476 16.4474 5.06976Z"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M12 16.5H15.585C16.5525 16.5 17.31 15.6825 17.2425 14.715L16.5 4.5"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.25977 4.78488L8.03977 1.54492"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.2852 4.79257L12.9902 1.5376"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.7749 9H11.7749"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.0249 12H11.0249"
      :stroke="stroke"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

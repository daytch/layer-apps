<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    fill?: string;
  }>(),
  {
    width: 24,
    height: 24,
    fill: "#C2F3D6",
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
      d="M16.609 1H7.391C3.387 1 1 3.387 1 7.391V16.598C1 20.613 3.387 23 7.391 23H16.598C20.602 23 22.989 20.613 22.989 16.609V7.391C23 3.387 20.613 1 16.609 1ZM8.821 17.39C8.821 17.698 8.579 17.94 8.271 17.94H5.202C4.894 17.94 4.652 17.698 4.652 17.39V12.308C4.652 11.615 5.213 11.054 5.906 11.054H8.271C8.579 11.054 8.821 11.296 8.821 11.604V17.39ZM14.079 17.39C14.079 17.698 13.837 17.94 13.529 17.94H10.46C10.152 17.94 9.91 17.698 9.91 17.39V7.314C9.91 6.621 10.471 6.06 11.164 6.06H12.836C13.529 6.06 14.09 6.621 14.09 7.314V17.39H14.079ZM19.348 17.39C19.348 17.698 19.106 17.94 18.798 17.94H15.729C15.421 17.94 15.179 17.698 15.179 17.39V13.485C15.179 13.177 15.421 12.935 15.729 12.935H18.094C18.787 12.935 19.348 13.496 19.348 14.189V17.39Z"
      :fill="fill"
    />
  </svg>
</template>

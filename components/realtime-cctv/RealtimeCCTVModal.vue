<script setup lang="ts">
defineEmits(["handleCloseModal"]);
</script>

<template>
  <div class="flex items-center justify-center relative">
    <button
      type="button"
      class="absolute right-0 -top-14 md:-top-10 md:-right-10"
      @click="$emit('handleCloseModal')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="size-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
    <div class="w-[90vw] max-w-[1116px]">
      <video width="320" height="240" controls class="w-full h-full">
        <source
          src="https://www.w3schools.com/tags/movie.mp4"
          type="video/mp4"
        />
        <source
          src="https://www.w3schools.com/tags/movie.ogg"
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

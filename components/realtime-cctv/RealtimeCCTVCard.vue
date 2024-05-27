<script setup lang="ts">
defineEmits(["onSelectCard"]);
</script>

<template>
  <button type="button" @click="$emit('onSelectCard')">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="w-full h-[230px]">
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
      <div class="py-4 px-6">
        <p
          class="text-base text-[--app-dark-100] font-semibold leading-6 mb-1 text-left"
        >
          Kandang Jatinangor
        </p>
        <p
          class="text-sm font-normal leading-[22px] text-[--app-primary-text] mb-3 text-left"
        >
          COKRO-1
        </p>
        <p class="text-xs leading-5 font-normal text-[#2CD673] text-left">
          Connected
        </p>
      </div>
    </div>
  </button>
</template>

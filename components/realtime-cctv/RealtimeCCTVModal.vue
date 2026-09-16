<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Hls from 'hls.js';

interface CCTVData {
  videoUrl: string;
}

const props = defineProps<{
  cctv: CCTVData | null;
}>();

defineEmits(["handleCloseModal"]);

const videoRef = ref<HTMLVideoElement | null>(null);
let hls: Hls | null = null;

const initVideo = () => {
  if (props.cctv && videoRef.value) {
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(props.cctv.videoUrl);
      hls.attachMedia(videoRef.value);
      
      // Auto-play saat modal dibuka
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.value?.play().catch(e => console.log('Autoplay dicegah browser', e));
      });
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.value.src = props.cctv.videoUrl;
      videoRef.value.play();
    }
  }
};

onMounted(() => {
  initVideo();
});

// Jika data cctv berubah saat modal sudah terbuka
watch(() => props.cctv, () => {
  if (hls) hls.destroy();
  initVideo();
});

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy();
  }
});
</script>

<template>
  <div class="flex items-center justify-center relative">
    <button
      type="button"
      class="absolute right-0 -top-14 md:-top-10 md:-right-10"
      @click="$emit('handleCloseModal')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-12">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </button>
    <div class="w-[90vw] max-w-[1116px]">
      <video ref="videoRef" width="320" height="240" controls autoplay class="w-full h-full bg-black"></video>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Hls from 'hls.js';

interface CCTVData {
  name: string;
  code: string;
  status: string;
  videoUrl: string;
}

const props = defineProps<{ cctv: CCTVData }>();
defineEmits(["onSelectCard"]);

const videoRef = ref<HTMLVideoElement | null>(null);
let hls: Hls | null = null;

onMounted(() => {
  if (videoRef.value) {
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(props.cctv.videoUrl);
      hls.attachMedia(videoRef.value);
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback untuk browser yang mendukung HLS native (misal: Safari)
      videoRef.value.src = props.cctv.videoUrl;
    }
  }
});

// Bersihkan memory saat komponen dihapus
onBeforeUnmount(() => {
  if (hls) {
    hls.destroy();
  }
});
</script>

<template>
  <button type="button" @click="$emit('onSelectCard')">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="w-full h-[230px]" @click.stop>
        <!-- Tambahkan ref="videoRef" dan hapus tag <source> -->
        <video ref="videoRef" width="320" height="240" controls class="w-full h-full object-cover" muted></video>
      </div>
      <div class="py-4 px-6">
        <p class="text-base text-[--app-dark-100] font-semibold leading-6 mb-1 text-left">
          {{ cctv.name }}
        </p>
        <p class="text-sm font-normal leading-[22px] text-[--app-primary-text] mb-3 text-left">
          {{ cctv.code }}
        </p>
        <p 
          class="text-xs leading-5 font-normal text-left"
          :class="cctv.status === 'Connected' ? 'text-[#2CD673]' : 'text-red-500'"
        >
          {{ cctv.status }}
        </p>
      </div>
    </div>
  </button>
</template>
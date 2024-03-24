<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import ClassNames from "embla-carousel-class-names";

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true }, [ClassNames()]);
let selectedIndex = ref(0);

const prevSlide = () => emblaApi.value?.scrollPrev();
const nextSlide = () => emblaApi.value?.scrollNext();

const onSelect = () => {
  if (!emblaApi.value) return;
  selectedIndex.value = emblaApi.value.selectedScrollSnap();
};

watchEffect(() => {
  if (!emblaApi.value) return;
  emblaApi.value.on("select", onSelect);
  onSelect();
});

const slides = [
  "/images/home/gallery_1_farmer.png",
  "/images/home/gallery_2_farmer.png",
  "/images/home/gallery_3_farmer.png",
];
</script>

<template>
  <section class="py-[72px] bg-white">
    <h2
      class="text-center mb-9 md:mb-[60px] text-3xl md:text-[40px] leading-10 md:leading-[48px] text-[--app-primary-200] font-bold"
    >
      Galeri Budidaya
    </h2>
    <div class="slider mb-9 md:mb-[70px] relative">
      <div class="gallery-slider" ref="emblaRef">
        <div class="gallery-slider-container">
          <div
            v-for="slide in slides"
            class="gallery-slider-slide"
            :key="slide"
          >
            <div class="gallery-slider-slide-image-container">
              <NuxtImg
                format="webp"
                width="785"
                height="536"
                class="gallery-slider-slide-image"
                :src="slide"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="hidden absolute md:block left-0 right-0 top-1/2 -translate-y-1"
      >
        <UContainer>
          <div class="flex items-center justify-between">
            <button @click="prevSlide" type="button">
              <UIcon
                name="i-heroicons-arrow-left-circle"
                class="w-14 h-14 text-white"
              />
            </button>
            <button @click="nextSlide" type="button">
              <UIcon
                name="i-heroicons-arrow-right-circle"
                class="w-14 h-14 text-white"
              />
            </button>
          </div>
        </UContainer>
      </div>
    </div>
    <UContainer>
      <h3
        class="mb-6 text-[--app-dark-100] text-[30px] md:text-[40px] leading-10 md:leading-[48px] font-bold"
      >
        Kandang COKRO
      </h3>
      <p class="text-[--app-dark-100] text-lg md:text-[22px] mb-6">
        Adalah aplikasi berbasis web yang dapat memberikan informasi secara
        realtime kepada peternak / mitra ternak ayam petelur “layer” tentang
        periodisasi budidaya, recording produksi, stock pakan dan obat- obatan,
        laporan hasil bulanan, grafik FCR harian, riwayat diagnosis kendang
        serta SOP manajemen kendang.
      </p>
      <p class="text-[--app-dark-100] text-lg md:text-[22px]">
        Aplikasi ini juga dilengkapi dengan akses CCTV secara realtime untuk
        memantau lingkungan sekitar kandang dan penerapan Bio Security.
      </p>
    </UContainer>
  </section>
</template>

<style scoped>
.slider {
  --slide-height: 536px;
  --slide-spacing: 0;
  --slide-size: 55%;
}
.gallery-slider {
  overflow: hidden;
}
.gallery-slider-container {
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
}
.gallery-slider-slide {
  @apply grow-0 shrink-0 basis-full md:basis-[--slide-size] min-w-0 pl-0 md:pl-[--slide-spacing];
}
.gallery-slider-slide-image {
  @apply rounded-[1.8rem] block h-[223px] md:h-[--slide-height] w-full object-cover;
}
.gallery-slider-slide-image-container {
  transform-origin: center;
  transition: all linear 0.25s;
}
.gallery-slider-slide:not(.is-snapped) .gallery-slider-slide-image-container {
  transform: scale(0.95);
}
</style>

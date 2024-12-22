<script setup lang="ts">
defineProps<{ images: Array<string> }>();
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
</script>

<template>
  <div
    v-if="!!$props?.images?.length"
    class="slider relative mb-9 md:mb-[70px] hidden md:block"
  >
    <div class="gallery-slider" ref="emblaRef">
      <div class="gallery-slider-container">
        <div
          v-for="slide in $props.images"
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
    <div class="hidden absolute md:block left-0 right-0 top-1/2 -translate-y-1">
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
  @apply rounded-[1.8rem] block h-[223px] md:h-[--slide-height] w-full object-fill;
}
.gallery-slider-slide-image-container {
  transform-origin: center;
  transition: all linear 0.25s;
}
.gallery-slider-slide:not(.is-snapped) .gallery-slider-slide-image-container {
  transform: scale(0.95);
}
</style>

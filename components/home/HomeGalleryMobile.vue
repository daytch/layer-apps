<script setup lang="ts">
const props = defineProps<{ images: Array<string> }>();
const showImage = ref(2);

const showAllImages = () => {
  const imagesLength = props?.images?.length || 2;
  showImage.value = imagesLength;
};

const isAlreadyShowAllImage = computed(
  () => showImage.value === (props?.images?.length || 2)
);
</script>

<template>
  <div class="md:hidden mb-14" v-if="!!$props?.images?.length">
    <UContainer class="space-y-4">
      <template v-for="(image, index) in images" :key="index">
        <div
          class="w-full relative"
          v-if="
            isAlreadyShowAllImage ? isAlreadyShowAllImage : index < showImage
          "
        >
          <div
            v-if="index === 1 && !isAlreadyShowAllImage"
            class="absolute top-0 bottom-0 right-0 left-0 rounded-[22px] rotate-180 home-gallery-bg-pattern"
          />
          <NuxtImg
            :src="image"
            alt="Peternak"
            width="327"
            height="223"
            format="webp"
            class="rounded-[22px] w-full h-[223px] object-cover"
          />
          <button
            @click="showAllImages"
            type="button"
            class="absolute -bottom-[25px] left-1/2 -translate-x-1/2 w-full max-w-[300px] inline-flex items-center justify-center py-[13px] px-7 bg-white text-[--app-secondary] rounded-md"
            style="box-shadow: 0px 1px 3px 0px rgba(166, 175, 195, 0.4)"
            v-if="index === 1 && !isAlreadyShowAllImage"
          >
            Lihat semua foto
          </button>
        </div>
      </template>
    </UContainer>
  </div>
</template>

<style>
.home-gallery-bg-pattern {
  background: linear-gradient(
    180deg,
    #d9d9d9 0%,
    rgba(115, 115, 115, 0) 80.04%
  );
}
</style>

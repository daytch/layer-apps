<script setup lang="ts">
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
    <HomeGalleryCarousel :images="slides" />
    <HomeGalleryMobile :images="slides || []" />
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

<template>
  <section class="bg-[--app-primary-200] relative pt-[118px] pb-[109px]">
    <NuxtImg
      format="webp"
      src="/images/home/leave_pattern_right.png"
      alt=""
      width="786"
      height="632"
      class="absolute top-0 bottom-0 right-0 h-full w-auto object-cover"
    />
    <UContainer>
      <div
        class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-16"
      >
        <div
          class="w-full md:max-w-[384px] flex justify-center md:justify-start"
        >
          <NuxtImg
            format="webp"
            src="/images/home/farmer_with_mockup.png"
            width="384"
            height="402"
            alt="Peternak dan Aplikasi"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-white text-[40px] font-bold leading-[48px] mb-6">
            Layer Apps
          </h2>
          <p
            class="text-white text-lg md:text-[22px] leading-normal md:leading-[28px] font-normal mb-6"
          >
            Adalah aplikasi berbasis web yang dapat memberikan informasi secara
            realtime kepada peternak / mitra ternak ayam petelur “layer” tentang
            periodisasi budidaya, recording produksi, stock pakan dan obat-
            obatan, laporan hasil bulanan, grafik FCR harian, riwayat diagnosis
            kendang serta SOP manajemen kendang.
          </p>
          <p
            class="text-white text-lg md:text-[22px] leading-normal md:leading-[28px] font-normal"
          >
            Aplikasi ini juga dilengkapi dengan akses CCTV secara realtime untuk
            memantau lingkungan sekitar kandang dan penerapan Bio Security.
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>

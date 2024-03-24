<template>
  <section class="bg-white pt-[89px] pb-[191px]">
    <UContainer>
      <div
        class="flex flex-col-reverse md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-2"
      >
        <div class="w-full md:w-1/2">
          <h2
            class="text-[30px] font-semibold leading-[38px] text-[--app-dark-100] mb-6"
          >
            Kandang Ayam Telue
            <span class="text-[--app-primary-100]">“Cokro Farm”</span>
          </h2>
          <p
            class="text-[--app-primary-text] text-lg md:text-[22px] font-normal leading-7 mb-6"
          >
            Adalah aplikasi berbasis web yang dapat memberikan informasi secara
            realtime kepada peternak / mitra ternak ayam petelur “layer” tentang
            periodisasi budidaya, recording produksi, stock pakan dan obat-
            obatan, laporan hasil bulanan, grafik FCR harian, riwayat diagnosis
            kendang serta SOP manajemen kendang.
          </p>
          <p
            class="text-[--app-primary-text] text-lg md:text-[22px] font-normal leading-7"
          >
            Aplikasi ini juga dilengkapi dengan akses CCTV secara realtime untuk
            memantau lingkungan sekitar kandang dan penerapan Bio Security.
          </p>
        </div>
        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <NuxtImg
            format="webp"
            alt="Suasana Kandang"
            src="/images/home/farmer_activity.png"
            width="412"
            height="409"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import IconChecklistKandang from "../ui/icon/IconChecklistKandang.vue";
import IconChartKandang from "../ui/icon/IconChartKandang.vue";
import IconCCTVKandang from "../ui/icon/IconCCTVKandang.vue";
import IconMonthlyReportKandang from "../ui/icon/IconMonthlyReportKandang.vue";

const solutions = [
  {
    component: IconChecklistKandang,
    title: "Checklist SOP Kandang",
  },
  {
    component: IconChartKandang,
    title: "RecordingProduksi",
  },
  {
    component: IconCCTVKandang,
    title: "Integrasi Realtime CCTV",
  },
  {
    component: IconMonthlyReportKandang,
    title: "Laporan Hasil Bulanan",
  },
];
</script>

<template>
  <section class="bg-[--app-gray-200] pt-8 pb-16 md:pt-16 md:pb-[150px]">
    <UContainer>
      <h2
        class="text-center text-[--app-primary-200] text-3xl font-semibold mb-9 leading-9 md:text-[40px] md:mb-[70px] md:leading-[48px]"
      >
        Solusi Kami
      </h2>
      <NuxtImg
        format="webp"
        src="/images/home/apps_mock.png"
        class="block mx-auto mb-9 xl:mb-0"
        width="328"
        height="230"
      />
      <div class="hidden xl:flex xl:justify-center">
        <SolutionChart />
      </div>
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[42px] xl:hidden"
      >
        <template v-for="(solution, index) in solutions" :key="index">
          <div class="flex flex-col items-center text-center space-y-8">
            <component :is="solution.component" />
            <p class="text-black font-bold text-lg leading-[26px]">
              {{ solution.title }}
            </p>
          </div>
        </template>
      </div>
    </UContainer>
  </section>
</template>

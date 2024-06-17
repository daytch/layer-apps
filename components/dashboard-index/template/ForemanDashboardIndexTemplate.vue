<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";

const { queryParams, handleNewQueryParams } = useQueryParams();
const { getKandangOptions } = useKandang();

const selectedCoop = computed(() => {
  return !!queryParams.value?.["coopId"]?.toString()?.length &&
    !isNaN(Number(queryParams.value?.["coopId"]))
    ? Number(queryParams.value?.["coopId"])
    : undefined;
});
const { data } = await useAsyncData(ASYNC_KEY.KANDANG_OPTIONS, async () => getKandangOptions(), {
  lazy: true,
});
</script>

<template>
  <div class="content-wrapper-height flex flex-col w-full bg-white pb-20">
    <ForemanMemberWelcome />
    <DashboardContainer>
      <div class="flex justify-end mb-6">
        <div class="max-w-[300px]">
          <UInputMenu
            size="md"
            :nullable="true"
            :model-value="selectedCoop"
            :options="data || []"
            placeholder="Pilih Kandang"
            :input-class="'input-select-trigger'"
            :value-attribute="'value'"
            :option-attribute="'label'"
            @update:model-value="
                (value: number) => {
                 handleNewQueryParams({coopId: value})
                }
              "
          />
        </div>
      </div>
      <div class="flex items-center justify-between pt-3 mb-[14px]">
        <p class="text-sm text-[--app-dark-100] font-medium leading-[22px]">Menu</p>
        <p class="text-xs font-normal leading-5 text-[--app-dark-100]">
          {{ formatDate(new Date(), "EEEE, dd MMMM yyyy") }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        <ForemanMemberMenuCard
          :to="
            !!selectedCoop
              ? `/dashboard/report-sop/mandor?coopId=${selectedCoop}`
              : '/dashboard/report-sop/mandor'
          "
          :heading="'SOP Harian'"
          :description="'Mengerjakan sesuai SOP'"
        >
          <template #icon>
            <IconChecklist fill="#22AD5C" class="w-9 h-9 mb-3" />
          </template>
        </ForemanMemberMenuCard>
        <ForemanMemberMenuCard
          :to="'/'"
          :heading="'Stok Makan & Obat'"
          :description="'Mengerjakan sesuai SOP'"
        >
          <template #icon>
            <IconMedicine fill="#22AD5C" class="w-9 h-9 mb-3" />
          </template>
        </ForemanMemberMenuCard>
        <ForemanMemberMenuCard
          :to="'/'"
          :heading="'Diagnosis Kandang'"
          :description="'Apabila ada gejala ayam sakit'"
        >
          <template #icon>
            <IconWarehouse fill="#22AD5C" class="w-9 h-9 mb-3" />
          </template>
        </ForemanMemberMenuCard>
      </div>
    </DashboardContainer>
  </div>
</template>

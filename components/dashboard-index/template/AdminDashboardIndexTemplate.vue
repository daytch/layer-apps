<script setup lang="ts">
import formatDate from "~/utils/formatDate";
const { getDashboardData, getFCRChartData } = useFetchDashboard();
const { getAllKandang } = useKandang();

const selectedCoop = ref<number | undefined>(undefined);
const { data, pending } = await useAsyncData(
  "DASHBOARD_DATA",
  async () => getDashboardData(),
  {
    lazy: true,
  },
);
const {
  data: fcrData,
  pending: pendingFCR,
  execute: executeFCR,
} = await useAsyncData(
  "FCR_DASHBOARD_DATA",
  async () => {
    if (!selectedCoop.value) return;
    return getFCRChartData({
      coopId: selectedCoop.value,
      period: formatDate(new Date(), "yyyy-MM-01"),
    });
  },
  {
    immediate: false,
  },
);
const { data: coops } = await useAsyncData(
  "FCR_KANDANG",
  async () => {
    const result = getAllKandang();
    result.then((data) => {
      if (!selectedCoop.value && !!data?.length) {
        selectedCoop.value = data[0]?.id;
      }
    });
    return result;
  },
  {
    lazy: true,
    transform: (data) => {
      if (!data?.length) return [];
      return data.map((coop) => ({ label: coop?.name, value: coop?.id }));
    },
  },
);

watch(
  selectedCoop,
  (newValue) => {
    if (newValue) {
      executeFCR();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="py-[14px] lg:py-[36px] space-y-[14px] lg:space-y-8">
    <WelcomeCard />
    <DashboardContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
        <BalanceCard :total-cashflow="data?.totalCashflow || 0" />
        <MonthlyResultCard />
        <MemberOverviewCard :users="data?.userData || []" />
      </div>
      <FCRChart :fcr-data="fcrData?.data || []" :is-loading="pendingFCR">
        <template #filter>
          <USelectMenu
            v-model="selectedCoop"
            :options="coops || []"
            class="select-options relative min-w-[200px]"
            placeholder="Pilih Kandang"
            value-attribute="value"
            option-attribute="label"
          />
        </template>
      </FCRChart>
    </DashboardContainer>
  </div>
</template>

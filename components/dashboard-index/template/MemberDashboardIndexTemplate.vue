<script setup lang="ts">
const userData = useAuthUser();

const dailySOPLink = computed(() => {
  let url = "/dashboard/report-sop/anak-kandang?tab=Anak%20Kandang";
  const coopId = userData.value?.user?.coops[0]?.coopId;
  if (!!coopId) {
    url += "&coopId=" + coopId;
  }
  return url;
});
</script>

<template>
  <div class="content-wrapper-height flex flex-col w-full bg-white pb-20">
    <ForemanMemberWelcome />
    <DashboardContainer>
      <div class="flex items-center justify-between pt-3 mb-[14px]">
        <p class="text-sm text-[--app-dark-100] font-medium leading-[22px]">
          Menu
        </p>
        <p class="text-xs font-normal leading-5 text-[--app-dark-100]">
          {{ formatDate(new Date(), "EEEE, dd MMMM yyyy") }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        <ForemanMemberMenuCard
          :to="dailySOPLink"
          :heading="'SOP Harian'"
          :description="'Mengerjakan sesuai SOP'"
        >
          <template #icon>
            <IconChecklist fill="#22AD5C" class="w-9 h-9 mb-3" />
          </template>
        </ForemanMemberMenuCard>
      </div>
    </DashboardContainer>
  </div>
</template>

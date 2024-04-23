<script setup lang="ts">
const people = [
  "Semua",
  "Kandang Satu",
  "Kandang Dua",
  "Kandang Tiga",
  "Kandang Empat",
  "Kandang Lima",
];

const selected = ref(people[0]);
</script>

<template>
  <div class="py-[14px] lg:py-[36px] space-y-[14px] lg:space-y-8">
    <WelcomeCard />
    <DashboardContainer>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
        <BalanceCard />
        <MonthlyResultCard />
        <MemberOverviewCard />
      </div>
      <FCRChart>
        <template #filter>
          <USelectMenu
            v-model="selected"
            :options="people"
            class="select-options relative min-w-[150px]"
          />
        </template>
      </FCRChart>
    </DashboardContainer>
  </div>
</template>

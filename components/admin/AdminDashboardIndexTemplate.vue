<template>
  <WelcomeCard />
  <DashboardContainer>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <BalanceCard />
      <MonthlyResultCard />
      <MemberOverviewCard />
    </div>
  </DashboardContainer>
  <FCRChart />
</template>

<script setup lang="ts">
const authUser = useAuthUser();
</script>

<template>
  <DashboardContainer>
    <template v-if="authUser?.loading">
      <PulseCard />
    </template>
    <template v-else>
      <UCard
        :ui="{
          body: {
            padding: 'p-6',
          },
        }"
      >
        <div class="flex justify-between flex-col-reverse md:flex-row">
          <div class="flex-1">
            <h2
              class="text-[--app-dark-100] text-2xl font-semibold leading-[30px] mb-3"
            >
              Selamat Datang, {{ authUser?.user?.name }}
            </h2>
            <p class="text-[--app-dark-500] leading-6 text-base mb-9">
              {{ formatDate(new Date(), "EEEE, dd MMMM yyyyy") }}
            </p>
            <p class="text-[--app-dark-500] text-sm leading-[22px] mb-2">
              Pintasan :
            </p>
            <div class="flex gap-2 flex-wrap">
              <NuxtLink
                href="/dashboard/produksi-telur"
                class="focus:outline-none focus-visible:outline-0 flex-shrink-0 text-base font-medium gap-x-2 ring-1 ring-inset hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
              >
                Tambah Data Produksi Telur
              </NuxtLink>
              <NuxtLink
                href="/dashboard/management-sop"
                class="focus:outline-none focus-visible:outline-0 flex-shrink-0 text-base font-medium gap-x-2 ring-1 ring-inset hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
              >
                Tambah SOP Kandang
              </NuxtLink>
              <NuxtLink
                href="/dashboard/users"
                class="focus:outline-none focus-visible:outline-0 flex-shrink-0 text-base font-medium gap-x-2 ring-1 ring-inset hover:bg-primary-50 focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
              >
                Tambah Pengguna
              </NuxtLink>
            </div>
          </div>
          <NuxtImg
            width="214"
            height="172"
            src="/images/dashboard/welcome-admin-illustration.png"
            format="webp"
            class="block mx-auto mb-4"
          />
        </div>
      </UCard>
    </template>
  </DashboardContainer>
</template>

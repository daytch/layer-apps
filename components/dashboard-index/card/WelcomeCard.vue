<template>
  <DashboardContainer>
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
            Selamat Datang, Lukman
          </h2>
          <p class="text-[--app-dark-500] leading-6 text-base mb-9">
            Selasa, 05 Maret 2024
          </p>
          <p class="text-[--app-dark-500] text-sm leading-[22px] mb-2">
            Pintasan :
          </p>
          <div class="flex gap-2 flex-wrap">
            <UButton
              type="button"
              variant="outline"
              class="rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
            >
              Tambah Data Produksi Telur
            </UButton>
            <UButton
              type="button"
              variant="outline"
              class="rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
            >
              Tambah SOP Kandang
            </UButton>
            <UButton
              type="button"
              variant="outline"
              class="rounded-[50px] ring-[--app-gray-500] text-[--app-dark-500] py-2 px-4"
            >
              Tambah Pengguna
            </UButton>
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
  </DashboardContainer>
</template>

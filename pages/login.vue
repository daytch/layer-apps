<script setup lang="ts">
useSeoMeta({
  title: 'Login | Layer Apps'
})
</script>

<template>
  <main
    class="bg-white md:bg-[#F3F4F6] min-h-screen flex flex-col justify-center items-center py-[34px] relative"
  >
    <div class="hidden md:block absolute top-0 left-0 bottom-0 w-[30vw] bg-[--app-primary-100] z-2" />
    <!-- Card Container Wrapper Component -->
    <div class="bg-transparent md:bg-white flex rounded-[24px] relative z-[5] w-full max-w-[1200px] overflow-hidden md:pt-[109px]">
      <div class="hidden md:flex items-center flex-col w-1/2 max-w-[504px] relative overflow-hidden">
        <NuxtImg src="/images/layer_apps_potrait.svg" width="185" height="242" alt="Layer Apps Logo" />
        <NuxtImg src="/images/auth/auth_background.png" class="w-full h-auto" alt="Background" />
      </div>
      <div class="flex-1 md:pt-10 md:pb-4 md:flex justify-center md:px-4">
        <div class="w-full md:max-w-[318px]">
          <h1 class="hidden md:block text-dark font-semibold text-[30px] mb-10">Selamat Datang</h1>
          <LoginForm />
        </div>
      </div>
    </div>
    <!-- End Card Container Wrapper Component -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden">
      <NuxtImg
        src="/images/auth/auth_background_sp.png"
        alt=""
        sizes="(max-width: 710px) 120px,
            (max-width: 991px) 193px,
            278px"
        class="w-full h-auto object-fit md:hidden"
      />
    </div>
  </main>
</template>

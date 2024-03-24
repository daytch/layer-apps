<template>
  <section class="relative h-[684px] md:h-[858px] overflow-hidden">
    <div
      class="absolute top-0 left-0 right-0 bottom-1/2 z-[3]"
      style="
        background: rgb(34, 173, 92);
        background: linear-gradient(
          180deg,
          rgba(34, 173, 92, 0.9557072829131653) 0%,
          rgba(34, 173, 92, 0) 100%
        );
      "
    />
    <NuxtImg
      srcset="/images/home/bg_hero.jpg 400w, /images/home/bg_hero.jpg 600w, /images/home/bg_hero.jpg 800w, /images/home/bg_hero.jpg 1000w, /images/home/bg_hero.jpg 1200w"
      src="/images/home/bg_hero.jpg"
      sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
      format="webp"
      alt="Ayam"
      width="1440"
      height="858"
      class="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover z-2"
    />
    <UContainer class="relative z-[5] h-full">
      <div class="flex flex-col justify-end items-center h-full py-24">
        <NuxtImg
          format="webp"
          srcset="/images/layer_apps_white_landscape.svg 400w, /images/layer_apps_white_landscape.svg 600w, /images/layer_apps_white_landscape.svg 800w, /images/layer_apps_white_landscape.svg 1000w, /images/layer_apps_white_landscape.svg 1200w"
          sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
          width="379"
          height="86"
          src="/images/layer_apps_white_landscape.svg"
          alt="Layer Apps Logo"
          class="mb-[14px] md:mb-[38px] w-[211px] md:w-[379px] h-auto"
        />
        <h1
          class="font-poppins text-white text-2xl md:text-[36px] font-medium leading-6 text-center mb-[44px] md:mb-[25px]"
        >
          Digital Marketing System
        </h1>
        <NuxtLink
          to="/login"
          class="inline-flex justify-center items-center w-full md:hidden bg-white text-[--app-secondary] py-[13px] px-7 rounded-md font-medium text-base leading-6 uppercase"
          >Masuk</NuxtLink
        >
        <hr
          class="border-2 border-white max-w-[375px] w-full hidden md:block"
        />
      </div>
    </UContainer>
  </section>
</template>

<template>
  <footer class="relative bg-[--app-primary-200] py-8 overflow-hidden">
    <NuxtImg
      format="webp"
      src="/images/home/leave_pattern_footer.png"
      width="2417"
      height="1609"
      alt=""
      class="absolute top-0 bottom-0 object-cover h-full w-full md:w-auto md:h-auto"
    />
    <UContainer>
      <div
        class="flex flex-col space-y-9 sm:flex-row sm:space-y-0 justify-between mb-[116px]"
      >
        <NuxtImg
          format="webp"
          src="/images/layer_apps_white_landscape.svg"
          alt="Layer Apps Logo"
          width="177"
          height="40"
        />
        <div class="flex items-center space-x-3">
          <p class="text-white text-base font-normal leading-6">
            Hubungi kami :
          </p>
          <a href="#">
            <IconWhatsapp />
          </a>
          <a href="#">
            <IconInstagram />
          </a>
        </div>
      </div>
      <NuxtImg
        format="webp"
        src="/images/cokro_farm_logo.svg"
        alt="Cokro Farm Logo"
        width="295"
        height="92"
        class="block mx-auto"
      />
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const { accessToken } = useAuthCookie();
const { logout } = useAuth();
</script>

<template>
  <nav class="bg-[--app-primary-100] py-[22px]">
    <UContainer>
      <div class="flex items-center justify-center md:justify-between">
        <NuxtLink to="/">
          <NuxtImg
            format="webp"
            alt="Layer Apps Logo"
            width="178"
            height="40"
            src="/images/layer_apps_white_landscape.svg"
          />
        </NuxtLink>
        <NuxtLink
          v-if="!accessToken"
          to="/login"
          class="hidden md:inline-flex justify-center items-center bg-transparent text-white py-[13px] px-[28px] rounded-md border border-white text-base font-medium leading-6 uppercase"
        >
          Login
        </NuxtLink>
        <template v-else-if="accessToken">
          <button
            type="button"
            @click="logout"
            class="hidden md:inline-flex justify-center items-center bg-transparent text-white py-[13px] px-[28px] rounded-md border border-white text-base font-medium leading-6 uppercase"
          >
            Logout
          </button>
        </template>
      </div>
    </UContainer>
  </nav>
</template>

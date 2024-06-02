<script setup lang="ts">
const { isSidebarExpanded, isSidebarSliderOpen, isNotificationSliderOpen } =
  useDashboardSidebar();
const authUser = useAuthUser();

const items = computed(() => [
  [
    {
      slot: "account",
      label: "",
      disabled: true,
    },
  ],
]);
</script>

<template>
  <nav
    class="h-12 bg-[--app-primary-100] lg:bg-white lg:h-[--header-dashboard-height] border-b flex items-center justify-between px-4 lg:px-8 py-3 w-full"
  >
    <UButton
      type="button"
      @click="isSidebarExpanded = !isSidebarExpanded"
      :padded="false"
      color="gray"
      variant="link"
      class="p-0 [&>span]:text-[--app-primary-100] [&>span]:w-6 [&>span]:h-6 hidden lg:inline-flex"
      icon="i-heroicons-bars-3-bottom-left-16-solid"
    />
    <UButton
      type="button"
      @click="isSidebarSliderOpen = !isSidebarSliderOpen"
      :padded="false"
      color="gray"
      variant="link"
      class="p-0 [&>span]:text-white [&>span]:w-6 [&>span]:h-6 inline-flex lg:hidden"
      icon="i-heroicons-bars-3-bottom-left-16-solid"
    />
    <IconLogoLayerApps class="lg:hidden" />
    <div class="hidden lg:flex flex-1 ml-4 justify-end space-x-8">
      <!-- CCTV Page -->
      <NuxtLink
        to="/dashboard/realtime-cctv"
        type="button"
        class="hidden lg:inline-flex items-center space-x-[10px] py-3 px-7 border-[1.5px] border-[--app-primary-100] rounded-[50px] font-medium text-[--app-primary-100]"
      >
        <span class="inline-block">Realtime CCTV</span>
        <IconCamera />
      </NuxtLink>
      <!-- End CCTV Page -->
      <!-- Notification -->
      <UDropdown
        :items="items"
        :ui="{
          width: 'w-[330px]',
          item: { disabled: 'cursor-text select-text' },
        }"
        :popper="{
          strategy: 'absolute',
          placement: 'bottom',
          offsetDistance: 25,
        }"
        class="w-auto"
      >
        <template #default="{ open }">
          <UChip
            size="2xl"
            :ui="{
              base: 'absolute rounded-full w-[14px] h-[14px] bg-red-500 min-w-[0] top-[18px] right-[18px]',
            }"
          >
            <UButton
              type="button"
              icon="i-heroicons-bell"
              color="gray"
              class="rounded-full p-3 bg-transparent ring-[--app-primary-100] [&>span]:text-[--app-primary-100] [&>span]:w-6 [&>span]:h-6"
            />
            <template #trailing>
              <UIcon
                name="i-heroicons-ellipsis-vertical"
                class="w-5 h-5 ml-auto"
              />
            </template>
          </UChip>
        </template>

        <template #account>
          <div class="w-full text-left">
            <DashboardNotificationList />
          </div>
        </template>
      </UDropdown>
      <!-- End Notification -->
      <!-- User Avatar -->
      <div class="inline-flex items-center space-x-[14px]">
        <div class="text-right">
          <p class="text-sm font-medium leading-[22px] text-[--app-dark-100]">
            {{ authUser?.user?.name || "John Doe" }}
          </p>
          <p class="text-xs leading-5 text-[--app-dark-500]">
            {{ authUser?.user?.role_name || "" }}
          </p>
        </div>
        <NuxtImg
          :src="authUser?.user?.avatar || '/images/no_photo.png'"
          :alt="authUser?.user?.name || 'John Doe'"
          format="webp"
          width="50"
          height="50"
          class="w-[50px] h-[50px] rounded-full"
        />
      </div>
      <!-- End User Avatar -->
    </div>
    <UButton
      type="button"
      @click="isNotificationSliderOpen = !isNotificationSliderOpen"
      :padded="false"
      color="gray"
      variant="link"
      class="p-0 [&>span]:text-white [&>span]:w-[26px] [&>span]:h-[26px] inline-flex lg:hidden"
      icon="i-heroicons-bell"
    />
  </nav>
</template>

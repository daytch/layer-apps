<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Realtime CCTV | Layer Apps",
  description: "Realtime CCTV | Layer Apps",
});
const showCCTVModal = ref(false);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Realtime CCTV</DashboardHeadingTitle>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <RealtimeCCTVCard @on-select-card="showCCTVModal = true" />
        <RealtimeCCTVCard @on-select-card="showCCTVModal = true" />
        <RealtimeCCTVCard @on-select-card="showCCTVModal = true" />
        <RealtimeCCTVCard @on-select-card="showCCTVModal = true" />
      </div>
    </DashboardContainer>
  </div>
  <UModal
    v-model="showCCTVModal"
    :ui="{
      strategy: 'override',
      background: 'bg-transparent',
      overlay: {
        background: 'bg-[#111928]/60',
      },
      container: 'flex min-h-full items-center justify-center',
    }"
  >
    <RealtimeCCTVModal @handle-close-modal="showCCTVModal = false" />
  </UModal>
</template>

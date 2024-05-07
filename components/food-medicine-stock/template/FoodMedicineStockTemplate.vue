<script setup lang="ts">
const items = [
  {
    key: "stok",
    label: "Stok",
    description: "Stok",
  },
  {
    key: "riwayat-pemakaian",
    label: "Riwayat Pemakaian",
    description: "Riwayat Pemakaian",
  },
];
</script>

<template>
  <DashboardContainer>
    <h1 class="text-black text-2xl font-semibold leading-[30px] mb-[14px]">
      Stok Pakan & Obat
    </h1>
    <UTabs
      :items="items"
      class="w-full stock-tab"
      :ui="{
        list: {
          width: 'w-auto',
          background: 'bg-white',
          tab: {
            base: 'relative inline-flex items-center focus-visible:outline-0',
            padding: '',
            size: 'text-base',
            height: 'h-auto',
          },
        },
      }"
    >
      <template #default="{ item, selected }">
        <div class="relative grow shrink basis-full self-stretch py-4">
          <span
            class="truncate"
            :class="{
              'text-[--app-primary-100]': selected,
            }"
            >{{ item.label }}</span
          >
          <span
            v-if="selected"
            class="absolute truncate bottom-0 h-1 w-full left-0 right-0 bg-[--app-primary-100]"
          />
        </div>
      </template>
      <template #item="{ item }">
        <div v-if="item.key === 'stok'" class="py-[14px]">
          <StockManagement />
        </div>
        <div v-else-if="item.key === 'riwayat-pemakaian'" class="py-[14px]">
          <UsageHistory />
        </div>
        <div v-else class="hidden" />
      </template>
    </UTabs>
  </DashboardContainer>
</template>

<style>
.stock-tab [role="tablist"] {
  @apply flex border-b border-b-[#DFE4EA] px-6 h-auto py-0;
}
.stock-tab [role="tablist"] button:not(:last-child) {
  @apply mr-10;
}
.stock-tab [role="tablist"] > div {
  @apply hidden;
}
</style>

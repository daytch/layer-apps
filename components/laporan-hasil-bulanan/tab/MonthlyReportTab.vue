<script setup lang="ts">
const tabs = [
  {
    label: "Hasil Akhir",
    key: "hasil-akhir",
  },
  {
    label: "Penerimaan",
    key: "penerimaan",
  },
  {
    label: "Pengeluaran",
    key: "pengeluaran",
  },
];
const { selectedTab, handleChangeTab } = useTab(tabs);
</script>

<template>
  <div>
    <!-- Tab Buttons -->
    <div
      class="flex items-center justify-between px-6 border-b border-[#DFE4EA] mb-8"
    >
      <div class="space-x-10 flex overflow-x-auto" role="tablist">
        <button
          v-for="(item, index) in tabs"
          @click="handleChangeTab(item.key)"
          class="inline-flex items-center justify-center py-4 text-base leading-6 font-medium whitespace-nowrap"
          :class="[
            index === selectedTab
              ? 'border-b-2 border-[--app-primary-100] text-[--app-primary-100]'
              : 'text-[--app-primary-text]',
          ]"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <!-- Child -->
    <slot name="child" :activeKey="tabs[selectedTab].key" />
  </div>
</template>

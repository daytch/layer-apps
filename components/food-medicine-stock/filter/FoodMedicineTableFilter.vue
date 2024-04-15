<script setup lang="ts">
type RangeDate = {
  from: string;
  to: string;
};
defineEmits<{
  (e: "handleAddData"): void;
  (e: "handleChangeCageFilter", cageName: string): void;
  (e: "handleChangeRangeDate", range: RangeDate): void;
}>();
defineProps<{
  showAddButton: boolean;
  addButtonText?: string;
}>();
const KandangOptions = [
  { label: "Kandang Jatisari", value: "kandang-jatisari" },
  { label: "Kandang Wanaraya", value: "kandang-wanaraya" },
];
const filterState = reactive({
  cageName: undefined,
  rageDate: [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ],
});
</script>

<template>
  <div class="p-4 border rounded">
    <div
      class="flex flex-col lg:flex-row lg:items-center"
      :class="{
        'lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4': showAddButton,
        'lg:justify-end': !showAddButton,
      }"
    >
      <UButton
        v-if="showAddButton"
        @click="$emit('handleAddData')"
        type="button"
        icon="i-heroicons-plus"
        size="md"
        :ui="{
          strategy: 'override',
          base: 'whitespace-nowrap',
          padding: {
            md: 'py-[13px] px-4',
          },
          inline: 'inline-flex items-center justify-center',
          color: {
            primary: {
              solid:
                'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
            },
          },
        }"
      >
        {{ addButtonText || "" }}
      </UButton>
      <div
        class="flex flex-col lg:flex-row lg:items-center justify-end space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto"
      >
        <UInputMenu
          size="md"
          :nullable="true"
          v-model="filterState.cageName"
          :options="KandangOptions"
          placeholder="Pilih Nama Kandang"
          :input-class="'input-select-trigger'"
        />
        <div class="max-w-full lg:max-w-[248px]">
          <Datepicker
            :range="true"
            v-model:model-value="filterState.rageDate"
          />
        </div>
        <UButton
          type="button"
          size="md"
          :ui="{
            strategy: 'override',
            base: 'text-center',
            padding: {
              md: 'py-[13px] px-4',
            },
            inline: 'inline-flex items-center justify-center',
            color: {
              primary: {
                solid:
                  'bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
              },
            },
          }"
        >
          Tampilkan
        </UButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const KandangOptions = [
  { label: "Kandang Jatisari", value: "100000051" },
  { label: "Kandang Wanaraya", value: "100000052" },
];
const filterState = reactive<any>({
  periode: undefined,
  cage: undefined,
});
</script>

<template>
  <div class="my-4 mb-8 p-4 border rounded-lg bg-white">
    <div
      class="space-y-4 md:flex md:items-center md:justify-end md:space-x-4 md:space-y-0"
    >
      <div class="md:max-w-[250px]">
        <UInputMenu
          size="md"
          :nullable="true"
          v-model="filterState.cage"
          :options="KandangOptions"
          placeholder="Pilih Nama Kandang"
          :input-class="'py-[10px]'"
        />
      </div>
      <div class="md:max-w-[200px]">
        <DateTimePicker
          v-model:model-value="filterState.periode"
          :month-picker="true"
        >
          <template #input="{ value }">
            <UInput
              :ui="{
                padding: {
                  md: 'py-[10px] px-5',
                },
              }"
              variant="outline"
              :value="
                getMonthName(getDateMonthIndex({ type: 'string', date: value }))
              "
              placeholder="Pilih Periode"
            >
              <template #trailing>
                <IconCalendar />
              </template>
            </UInput>
          </template>
        </DateTimePicker>
      </div>
      <UButton
        type="button"
        size="md"
        :ui="{
          strategy: 'override',
          base: 'w-full md:w-auto',
          inline: 'inline-flex items-center justify-center',
          padding: {
            md: 'py-[10px] px-4',
          },
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
</template>

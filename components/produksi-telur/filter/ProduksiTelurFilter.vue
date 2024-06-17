<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";

defineProps<{
  containerClass?: string;
}>();
const { getKandangOptions } = useKandang();
const { data: KandangOptions } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  { lazy: true }
);
const { checkAll, HeaderVisibleToogleColumn, visibleColumns, isUpdateView } = useDataTable();
const filterState = ref({
  periode: undefined,
  cage: undefined,
});
const showImportFileModal = ref(false);

const getPeriodeText = (periodeValue: string) => {
  if (!periodeValue?.length) return "";
  return `${getMonthName(getDateMonthIndex({ type: "string", date: periodeValue }))} ${
    periodeValue.split("/")[1]
  }`;
};
</script>

<template>
  <div class="p-4 border rounded mb-8" :class="containerClass">
    <div class="flex justify-between space-x-4">
      <div class="space-y-2 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row">
        <button
          type="button"
          class="btn primary data-table-add-button"
          @click="showImportFileModal = !showImportFileModal"
        >
          <IconImport />
          <span>Import Data</span>
        </button>
        <button v-if="!isUpdateView" type="button" class="btn secondary data-table-add-button">
          <IconImport :stroke="'#1A8245'" />
          <span>Export Data .xls</span>
        </button>
      </div>
      <div class="flex items-center justify-end space-x-4 flex-1">
        <div class="md:max-w-[250px]">
          <UInputMenu
            size="md"
            :nullable="true"
            v-model="filterState.cage"
            :options="KandangOptions || []"
            placeholder="Pilih Nama Kandang"
            :input-class="'py-[10px]'"
            :option-attribute="'label'"
            :value-attribute="'value'"
          />
        </div>
        <div class="max-w-[166px]">
          <DateTimePicker v-model:model-value="filterState.periode" :month-picker="true">
            <template #input="{ value }">
              <UInput
                :ui="{
                  padding: {
                    md: 'py-[10px] px-5',
                  },
                }"
                variant="outline"
                :value="getPeriodeText(value)"
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
          color="primary"
          variant="ghost"
          :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
        >
          Tampilkan
        </UButton>
        <div class="w-[1px] h-12 bg-[--app-gray-500]" />
        <UPopover mode="click">
          <button type="button" class="btn outlined">
            <IconMenuBoard class="w-[18px] h-[18px]" :stroke="'#637381'" />
            <span>View Table</span>
          </button>
          <template #panel>
            <div class="p-[10px] space-y-[10px]">
              <UCheckbox v-model="checkAll" name="all" label="Semua" />
              <UCheckbox
                v-for="toggleColumn in HeaderVisibleToogleColumn"
                :value="toggleColumn.key"
                v-model="visibleColumns"
                :name="toggleColumn.key"
                :label="toggleColumn.label"
              />
            </div>
          </template>
        </UPopover>
        <button
          v-if="!isUpdateView"
          type="button"
          class="btn outlined"
          @click="isUpdateView = true"
        >
          <IconPencilUpdate class="w-[18px] h-[18px]" :stroke="'#637381'" />
          <span>Edit Data</span>
        </button>
        <button v-else class="btn primary data-table-add-button" @click="isUpdateView = false">
          Selesai
        </button>
      </div>
    </div>
  </div>
  <AppModal v-model:model-value="showImportFileModal">
    <ImportModal @handle-close-modal="showImportFileModal = false" />
  </AppModal>
</template>

<style>
.data-table-add-button:disabled path {
  stroke: var(--app-dark-500) !important;
}
.data-table-add-butto:disabled {
  @apply disabled:bg-[--app-dark-800] disabled:ring-[--app-dark-800] disabled:text-[--app-dark-500];
}
.btn {
  @apply py-[10px] px-4 inline-flex items-center space-x-2 ring-1 rounded-md disabled:cursor-not-allowed font-medium;
}
.btn.primary {
  @apply text-white bg-[--app-primary-100] ring-[--app-primary-100];
}
.btn.secondary {
  @apply text-[--app-primary-200] bg-[--app-primary-800] ring-[--app-primary-100];
}
.btn.outlined {
  @apply bg-white text-[--app-primary-text] ring-[#DFE4EA];
}
</style>

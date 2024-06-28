<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";

defineProps<{
  containerClass?: string;
  isFetchingData?: boolean;
}>();

const { getKandangOptions } = useKandang();
const { queryParams, handleNewQueryParams } = useQueryParams();

const { data: KandangOptions } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  { lazy: true }
);
const { checkAll, HeaderVisibleToogleColumn, visibleColumns, isUpdateView } =
  useDataTable();

const filterState = ref({
  periode: undefined,
  cage: undefined,
});
const { showModal, formStep } = useUploadEggData();

const getPeriodeText = (periodeValue: string) => {
  if (!periodeValue?.length) return "";
  return `${getMonthName(
    getDateMonthIndex({ type: "string", date: periodeValue })
  )} ${periodeValue.split("/")[1]}`;
};

const handleApplyFilter = () => {
  const newQuery: Record<string, string> = {};
  if (!!filterState.value.cage) {
    newQuery["coopId"] = filterState.value.cage;
  }
  if (!!filterState.value.periode) {
    const month = (filterState.value.periode as any).month + 1;
    newQuery["period"] = `${(filterState.value.periode as any)?.year}-${
      month < 10 ? "0" + month : month
    }-01`;
  }

  if (!!Object.keys(newQuery)?.length) {
    handleNewQueryParams(newQuery);
  }
};

onMounted(() => {
  const queryCoopId = queryParams.value["coopId"];
  const queryPeriod = queryParams.value["period"];
  let filter: Record<string, any> = {
    periode: undefined,
    cage: undefined,
  };
  if (
    !!queryCoopId?.toString()?.length &&
    !isNaN(Number(queryCoopId?.toString()))
  ) {
    filter["cage"] = Number(queryCoopId.toString());
  }
  if (
    !!queryPeriod?.toString().length &&
    isValidDate(queryPeriod?.toString())
  ) {
    const appliedDate = new Date(queryPeriod?.toString());

    filter["periode"] = {
      month: appliedDate.getMonth(),
      year: appliedDate.getFullYear(),
    };
  }
  filterState.value = filter as any;
});
</script>

<template>
  <div class="border rounded mb-8 pt-4 px-4" :class="containerClass">
    <div class="overflow-auto pb-4 px-0.5">
      <div class="flex justify-between space-x-6 mt-0.5">
        <div class="space-x-4 sm:space-x-6 flex flex-row">
          <button
            type="button"
            class="btn primary data-table-add-button"
            @click="showModal = true"
          >
            <IconImport />
            <span class="whitespace-nowrap">Import Data</span>
          </button>
          <button
            v-if="!isUpdateView"
            type="button"
            class="btn secondary data-table-add-button"
          >
            <IconImport :stroke="'#1A8245'" />
            <span class="whitespace-nowrap">Export Data .xls</span>
          </button>
        </div>
        <div class="flex items-center justify-end space-x-4 flex-1 px-0.5">
          <div class="md:max-w-[250px] min-w-[250px]">
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="filterState.cage"
              :options="KandangOptions || []"
              placeholder="Pilih Nama Kandang"
              :input-class="'py-[12px]'"
              :option-attribute="'label'"
              :value-attribute="'value'"
            />
          </div>
          <div class="max-w-[166px] min-w-[166px]">
            <DateTimePicker
              v-model:model-value="filterState.periode"
              :month-picker="true"
            >
              <template #input="{ value }">
                <UInput
                  :ui="{
                    padding: {
                      md: 'py-[12px] px-5',
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
            :disabled="isFetchingData"
            size="md"
            color="primary"
            variant="ghost"
            @click="handleApplyFilter"
            :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
          >
            Tampilkan
          </UButton>
          <div class="w-[1px] h-12 bg-[--app-gray-500]" />
          <UPopover mode="click">
            <button type="button" class="btn outlined">
              <IconMenuBoard class="w-[18px] h-[18px]" :stroke="'#637381'" />
              <span class="whitespace-nowrap">View Table</span>
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
            <span class="whitespace-nowrap">Edit Data</span>
          </button>
          <template v-else>
            <button
              class="btn danger data-table-add-button"
              @click="isUpdateView = false"
            >
              Hapus
            </button>
            <button
              class="btn primary data-table-add-button"
              @click="isUpdateView = false"
            >
              Selesai
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
  <AppModal
    :model-value="showModal"
    @update:model-value="
      () => {
        formStep = 'UPLOAD';
        showModal = false;
      }
    "
  >
    <ImportModal v-if="formStep === 'UPLOAD'" />
    <DuplicateConfirm v-else-if="formStep === 'DUPLICATE-CONFIRM'" />
    <p v-else>No show</p>
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
  @apply py-3 px-4 inline-flex items-center space-x-2 ring-1 rounded-md disabled:cursor-not-allowed font-medium whitespace-nowrap;
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
.btn.danger {
  @apply text-white bg-[--app-danger-300] ring-[--app-danger-300];
}
</style>

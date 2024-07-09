<script setup lang="ts">
import { API_LIST, ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";

defineProps<{
  containerClass?: string;
  isFetchingData?: boolean;
  disableDeleteButton?: boolean;
}>();
defineEmits<{
  (e: "handleShowModalConfirm"): void;
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

const {
  showModal,
  formStep,
  downloadDocumentEggData,
  isLoading: loadingUpdateData,
} = useUploadEggData();
const { handleShowToast } = useShowToast();
const selectedCageName = computed(() => {
  if (!filterState.value.cage || !KandangOptions?.value?.length) return "";
  return KandangOptions.value.find(
    (opt) => opt.value === Number(filterState.value.cage)
  )?.label;
});

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
const handleDownloadEggDataOnCoopAndDate = async () => {
  const coopId = queryParams.value["coopId"];
  const date = queryParams.value["period"];
  let params = {} as { coopId: number; date: string };
  if (!isNaN(Number(coopId)) && Number(coopId) !== 0) {
    params.coopId = Number(coopId);
  }
  if (!!date?.toString()?.length && isValidDate(date?.toString())) {
    params.date = date.toString();
  }

  await downloadDocumentEggData(params)
    .then((res: any) => res.blob())
    .then((blob: any) => URL.createObjectURL(blob))
    .then((href: any) => {
      const filename = `report-${formatDate(new Date(), "yyyy-MM-dd hh-mm")}`;
      Object.assign(document.createElement("a"), {
        href,
        download: filename + ".xlsx",
      }).click();
    })
    .catch(() => {
      handleShowToast({ type: "ERROR", message: "Gagal mengunduh dokumen." });
    });
};

const handleCloseModal = () => {
  formStep.value = "UPLOAD";
  showModal.value = false;
};
</script>

<template>
  <div class="border rounded mb-8 pt-4 px-4" :class="containerClass">
    <div class="pb-4 px-0.5 overflow-x-auto">
      <div class="flex flex-row space-x-6 mt-0.5 justify-between">
        <div class="space-x-6 flex flex-row">
          <button
            type="button"
            class="btn primary data-table-add-button xs:flex-1"
            @click="showModal = true"
          >
            <IconImport />
            <span class="whitespace-nowrap">Import Data</span>
          </button>
          <button
            v-if="!isUpdateView"
            type="button"
            :disabled="loadingUpdateData"
            @click="handleDownloadEggDataOnCoopAndDate"
            class="btn secondary data-table-add-button xs:flex-1"
          >
            <IconImport :stroke="'#1A8245'" />
            <span class="whitespace-nowrap">Export Data .xls</span>
          </button>
        </div>
        <div class="flex flex-row space-y-0 px-0.5 space-x-4 !ml-10">
          <div class="flex space-x-4">
            <!-- Opsi Kandang -->
            <div class="w-[250px]" id="filter-cage">
              <UDropdown
                size="md"
                :items="([(KandangOptions)?.map((opt) => ({
                  label: opt.label,
                  click: () => {
                    if(opt) {
                      filterState.cage = opt.value as any
                    }
                  },
                   icon: 'i-heroicons-pencil-square-20-solid',
                   shortcuts: ['E']
                }))] as any)"
                :ui="{
                  wrapper: 'relative inline-flex text-left w-full',
                  ring: 'ring-1 ring-[#DFE4EA]',
                  width: '',
                }"
              >
                <UButton
                  color="white"
                  :label="
                    !selectedCageName ? 'Pilih Kandang' : selectedCageName
                  "
                  trailing-icon="i-heroicons-chevron-down-20-solid"
                  class="w-full justify-between [&>span]:whitespace-nowrap"
                />
                <template #item="{ item }">
                  <span class="inline-block truncate">{{ item?.label }}</span>
                </template>
              </UDropdown>
            </div>
            <!-- End Opsi Kandang -->
            <!-- Date picker -->
            <div class="w-[166px]">
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
            <!-- End Date picker -->
            <!-- Tampilkan -->
            <UButton
              type="button"
              :disabled="isFetchingData"
              size="md"
              color="primary"
              variant="ghost"
              @click="handleApplyFilter"
              :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
              class="w-auto"
            >
              Tampilkan
            </UButton>
            <!-- End Tampilkan -->
          </div>

          <div class="flex space-x-4 w-auto">
            <div class="w-[1px] h-12 bg-[--app-gray-500] hidden 2xl:block" />
            <UPopover
              mode="click"
              class="xs:w-auto xs:flex-1 2xl:flex-none relative !ml-0 2xl:!ml-4"
            >
              <button
                type="button"
                class="btn outlined w-full xs:w-auto xs:flex-1"
              >
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
              class="btn outlined w-full xs:w-auto xs:flex-1 2xl:flex-none"
              @click="isUpdateView = true"
            >
              <IconPencilUpdate class="w-[18px] h-[18px]" :stroke="'#637381'" />
              <span class="whitespace-nowrap">Edit Data</span>
            </button>
            <template v-else>
              <button
                :disabled="disableDeleteButton"
                class="btn danger data-table-add-button btn-text-center w-full xs:w-auto xs:flex-1"
                @click="$emit('handleShowModalConfirm')"
              >
                Hapus
              </button>
              <button
                class="btn primary data-table-add-button btn-text-center w-full xs:w-auto xs:flex-1"
                @click="isUpdateView = false"
              >
                Selesai
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppModal :model-value="showModal" @update:model-value="handleCloseModal">
    <ImportModal
      v-if="formStep === 'UPLOAD'"
      @handle-close-modal="handleCloseModal"
    />
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
.btn.btn-text-center {
  @apply justify-center;
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
  @apply text-white bg-[--app-danger-300] ring-[--app-danger-300] disabled:bg-[--app-gray-200] disabled:ring-[--app-gray-200] disabled:text-[--app-dark-600];
}
</style>

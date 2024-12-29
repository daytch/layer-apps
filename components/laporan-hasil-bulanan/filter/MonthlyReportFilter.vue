<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_PRIMARY_BUTTON_STYLES,
  UI_PRIMARY_GHOST_BUTTON_STYLES,
} from "~/constants/ui";

const emits = defineEmits<{
  (e: "handleShowModal"): void;
}>();

const { getKandangOptions } = useKandang();
const { queryParams, handleNewQueryParams } = useQueryParams();

const { data: kandangOptions } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  { lazy: true }
);

const filterState = ref({
  cageName: undefined,
});

const selectedCageName = computed(() => {
  if (!filterState.value.cageName || !kandangOptions?.value?.length) return "";
  return kandangOptions.value.find(
    (opt) => opt.value === Number(filterState.value.cageName)
  )?.label;
});

const handleApplyFilter = () => {
  const newQuery: Record<string, string> = {};
  if (!!filterState.value.cageName) {
    newQuery["coopId"] = filterState.value.cageName;
  }

  if (!!Object.keys(newQuery)?.length) {
    handleNewQueryParams(newQuery);
  }
};

watchEffect(() => {
  const queryCoopId = queryParams.value["coopId"];
  let filter: Record<string, any> = {
    periode: undefined,
    cageName: undefined,
  };
  if (
    !!queryCoopId?.toString()?.length &&
    !isNaN(Number(queryCoopId?.toString()))
  ) {
    filter["cageName"] = Number(queryCoopId.toString());
  }

  filterState.value = filter as any;
});
</script>

<template>
  <div class="my-4 mb-8 p-4 border rounded-lg bg-white">
    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4"
    >
      <UButton
        @click="$emit('handleShowModal')"
        type="button"
        icon="i-heroicons-plus"
        size="md"
        :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
      >
        Upload Laporan
      </UButton>
      <div
        class="flex flex-col lg:flex-row lg:items-center justify-end space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto"
      >
        <!-- Opsi Kandang -->
        <div class="lg:w-[250px]" id="filter-cage">
          <UDropdown
            size="md"
            :items="([(kandangOptions)?.map((opt) => ({
                  label: opt.label,
                  click: () => {
                    if(opt) {
                      filterState.cageName = opt.value as any
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
              id="cage-filter-button"
              :label="!selectedCageName ? 'Pilih Kandang' : selectedCageName"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              class="w-full justify-between [&>span]:whitespace-nowrap"
            />
            <template #item="{ item }">
              <span class="inline-block truncate">{{ item?.label }}</span>
            </template>
          </UDropdown>
        </div>
        <!-- End Opsi Kandang -->

        <!-- Tampilkan -->
        <UButton
          type="button"
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
    </div>
  </div>
</template>

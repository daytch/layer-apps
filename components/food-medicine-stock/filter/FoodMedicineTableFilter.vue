<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_PRIMARY_BUTTON_STYLES,
  UI_PRIMARY_GHOST_BUTTON_STYLES,
} from "~/constants/ui";

type RangeDate = {
  from: string;
  to: string;
};
defineEmits<{
  (e: "handleAddData"): void;
}>();

defineProps<{
  showAddButton: boolean;
  addButtonText?: string;
}>();

const { getKandangOptions } = useKandang();

const { data: kandangOptions } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  { lazy: true }
);
const { handleNewQueryParams, queryParams } = useQueryParams();

const filterState = reactive<{
  cageName?: string | number;
  rageDate?: Array<Date> | Array<string>;
}>({
  cageName: undefined,
  rageDate: undefined,
});

const handleApplyFilter = () => {
  const newQuery: Record<string, string> = {};
  if (!!filterState?.cageName?.toString()?.length) {
    newQuery["coop"] = filterState.cageName.toString();
  }
  if (!!filterState?.rageDate?.[0]) {
    newQuery["from"] = formatDate(filterState?.rageDate?.[0], "yyyy-MM-dd");
  }
  if (!!filterState?.rageDate?.[1]) {
    newQuery["to"] = formatDate(filterState?.rageDate?.[1], "yyyy-MM-dd");
  }

  if (!!Object.keys(newQuery)?.length) {
    handleNewQueryParams(newQuery);
  }
};

function handleSetActiveFilter() {
  let range = [] as Array<Date>;
  if (!!queryParams.value?.["from"]?.length) {
    range.push(new Date(queryParams.value?.["from"] as string));
  }
  if (!!queryParams.value?.["to"]?.length) {
    range.push(new Date(queryParams.value?.["to"] as string));
  }
  (filterState.cageName = (queryParams.value?.["coop"] || undefined) as
    | string
    | undefined),
    (filterState.rageDate = range);
}
onMounted(handleSetActiveFilter);
watch(queryParams, handleSetActiveFilter);
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
        :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
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
          :options="
            kandangOptions?.map((p) => ({
              label: p?.label,
              value: p?.value?.toString(),
            }))
          "
          placeholder="Pilih Nama Kandang"
          :input-class="'input-select-trigger'"
          value-attribute="value"
          option-attribute="label"
        />
        <div class="max-w-full lg:max-w-[248px]">
          <Datepicker
            :range="true"
            v-model:model-value="filterState.rageDate"
            :placeholder="'Pilih Tanggal'"
          />
        </div>
        <UButton
          type="button"
          size="md"
          color="primary"
          variant="ghost"
          @click="handleApplyFilter"
          :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
        >
          Tampilkan
        </UButton>
      </div>
    </div>
  </div>
</template>

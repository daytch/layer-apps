<script setup lang="ts">
import type { ModelValue } from "@vuepic/vue-datepicker";
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
  range?: Array<Date> | Array<string>;
}>({
  cageName: undefined,
  range: undefined,
});

const handleApplyFilter = () => {
  let params: Record<string, string | undefined | number> = {};
  params["coop"] = filterState.cageName;
  params["from"] = filterState?.range?.[0]
    ? formatDate(filterState?.range?.[0], "yyyy-MM-dd")
    : undefined;
  params["to"] = filterState?.range?.[1]
    ? formatDate(filterState?.range?.[1], "yyyy-MM-dd")
    : undefined;
  if (!!Object.keys(params)?.length) {
    handleNewQueryParams(params);
  }
};

function handleSetActiveFilter() {
  let range = [] as Array<Date>;
  if (
    !!queryParams.value?.["from"]?.length &&
    isValidDate(queryParams.value?.["from"]?.toString())
  ) {
    range.push(new Date(queryParams.value?.["from"] as string));
  }
  if (
    !!queryParams.value?.["to"]?.length &&
    isValidDate(queryParams.value?.["to"]?.toString())
  ) {
    range.push(new Date(queryParams.value?.["to"] as string));
  }
  filterState.range = range;
  filterState.cageName = (queryParams.value?.["coop"] || undefined) as
    | string
    | undefined;
}
onMounted(handleSetActiveFilter);
watch(queryParams, handleSetActiveFilter);
</script>

<template>
  <DateRangeFilter
    v-model:model-value="filterState.range"
    :show-add-button="true"
    :add-button-text="'Tambah Data'"
    @handle-add-data="$emit('handleAddData')"
    style="background-color: white"
    @apply-filter="handleApplyFilter"
  >
    <template #additional>
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
    </template>
  </DateRangeFilter>
</template>

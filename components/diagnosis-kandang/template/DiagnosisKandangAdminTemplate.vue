<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { DiagnosisKandangType } from "~/types/report";

defineEmits<{
  (e: "handleShowAddModal"): void;
}>();
defineProps<{
  allDianosisKandang: Array<DiagnosisKandangType>;
  isLoading?: boolean;
}>();

const { getAllUserOptions } = useUser();
const { handleNewQueryParams, queryParams } = useQueryParams();
const { data } = await useAsyncData(ASYNC_KEY.USER_OPTIONS, async () => getAllUserOptions(), {
  lazy: true,
});

const filterState = reactive<{ range?: Array<Date>; employee?: number }>({
  employee: undefined,
  range: undefined,
});

const handleApplyFilter = () => {
  let params: Record<string, string | undefined | number> = {};
  params["userId"] = filterState.employee;
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

onMounted(() => {
  let range = [] as Array<Date>;
  if (
    !!queryParams.value?.["from"]?.length &&
    isValidDate(queryParams.value?.["from"]?.toString())
  ) {
    range.push(new Date(queryParams.value?.["from"] as string));
  }
  if (!!queryParams.value?.["to"]?.length && isValidDate(queryParams.value?.["to"]?.toString())) {
    range.push(new Date(queryParams.value?.["to"] as string));
  }
  filterState.range = range;
  filterState.employee = !!queryParams.value?.["userId"]?.length
    ? Number(queryParams.value?.["userId"])
    : undefined;
});
</script>

<template>
  <DateRangeFilter
    v-model:model-value="filterState.range"
    :show-add-button="true"
    :add-button-text="'Tambah Laporan'"
    @handle-add-data="$emit('handleShowAddModal')"
    style="background-color: white"
    @apply-filter="handleApplyFilter"
  >
    <template v-slot:additional>
      <UInputMenu
        size="md"
        :nullable="true"
        v-model="filterState.employee"
        :options="data || []"
        placeholder="Pilih Pekerja"
        :input-class="'input-select-trigger'"
        :value-attribute="'value'"
        :option-attribute="'label'"
      />
    </template>
  </DateRangeFilter>

  <ReportTable :reports="allDianosisKandang" :is-loading="isLoading" />
</template>

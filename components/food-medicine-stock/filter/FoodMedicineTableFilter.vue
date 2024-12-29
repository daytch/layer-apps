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
});

const handleApplyFilter = () => {
  const newQuery: Record<string, string> = {};
  if (!!filterState?.cageName?.toString()?.length) {
    newQuery["coop"] = filterState.cageName.toString();
  }
  if (!!Object.keys(newQuery)?.length) {
    handleNewQueryParams(newQuery);
  }
};

function handleSetActiveFilter() {
  filterState.cageName = (queryParams.value?.["coop"] || undefined) as
    | string
    | undefined;
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

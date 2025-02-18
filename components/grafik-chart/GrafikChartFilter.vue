<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_GHOST_BUTTON_STYLES } from "~/constants/ui";

const { getKandangOptions } = useKandang();
const { data: KandangOptions } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  { lazy: true }
);
const { handleNewQueryParams, queryParams } = useQueryParams();

type Periode = {
  month: number;
  year: number;
};

const filterState = reactive<{
  periode?: Periode;
  cage?: number;
}>({
  periode: undefined,
  cage: undefined,
});

const handleApplyFilter = () => {
  let params: Record<string, string | number | undefined> = {};
  let periode = undefined;
  if (filterState.periode) {
    const monthPlusOne = filterState.periode.month + 1;
    periode = `${filterState.periode.year}-${
      monthPlusOne < 10 ? `0${monthPlusOne}` : monthPlusOne
    }-01`;
  }
  params["coopId"] = filterState.cage;
  params["periode"] = periode;
  handleNewQueryParams(params);
};

const handleSetActiveFilter = () => {
  const cage = queryParams.value["coopId"]?.toString();
  const periode = (
    !!queryParams.value["periode"]?.length &&
    isValidDate(queryParams.value["periode"]?.toString())
      ? {
          month: new Date(
            queryParams.value?.["periode"].toString()
          )?.getMonth(),
          year: new Date(
            queryParams.value?.["periode"].toString()
          )?.getFullYear(),
        }
      : undefined
  ) as Periode | undefined;
  filterState.cage =
    !!cage?.length && !isNaN(Number(cage)) ? Number(cage) : undefined;
  filterState.periode = periode;
};

onMounted(handleSetActiveFilter);
watch(queryParams, handleSetActiveFilter);
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
          :options="KandangOptions || []"
          placeholder="Pilih Nama Kandang"
          :input-class="'py-[10px]'"
          :value-attribute="'value'"
          :option-attribute="'label'"
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
        @click="handleApplyFilter"
        variant="ghost"
        color="primary"
        :ui="{ ...UI_PRIMARY_GHOST_BUTTON_STYLES }"
      >
        Tampilkan
      </UButton>
    </div>
  </div>
</template>

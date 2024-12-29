<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import {
  MonthlyReportSchema,
  type MonthlyReportSchemaFormType,
} from "~/schemas/laporan-hasil-bulanan";

const emits = defineEmits<{
  (e: "handleHideModal"): void;
}>();

const { getKandangOptions } = useKandang();
const { handleUploadMonthlyReport, isLoading, progress } = useMonthlyReport();

const { data: coop } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  {
    lazy: true,
  }
);
const formState = reactive<MonthlyReportSchemaFormType>({
  coop: undefined,
  file: undefined,
  periode: undefined,
});

const handleCloseModal = () => {
  emits("handleHideModal");
};

const periodText = computed(() => getFieldPeriodText(formState.periode as any));

const handleSubmit = async (
  event: FormSubmitEvent<MonthlyReportSchemaFormType>
) => {
  const { data } = event;
  if (!data?.coop || !data?.periode || !data?.file) return;

  handleUploadMonthlyReport({
    payload: {
      coopId: data?.coop as number,
      file: data?.file as File,
      period: `${(data?.periode as any)?.year}-${
        (data?.periode as any)?.month + 1
      }-01`,
    },
    onCloseModal: handleCloseModal,
  });
};

const handleSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = (target.files || [])[0];
  formState.file = file;
};
</script>

<template>
  <UForm
    :state="formState"
    :schema="MonthlyReportSchema"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <UCard :ui="{ ...UI_CARD_STYLES }">
      <template #header>
        <div
          class="w-full flex justify-between items-center pb-6 mb-6 border-b"
        >
          <h2
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]"
          >
            Tambah Data
          </h2>
          <UButton
            @click="$emit('handleHideModal')"
            type="button"
            icon="i-heroicons-x-circle"
            class="bg-white text-[#292D32] [&>span]:w-6 [&>span]:h-6"
          />
        </div>
      </template>
      <div class="space-y-6">
        <div class="flex flex-col gap-x-6 gap-y-6">
          <UFormGroup label="Kandang" name="coop" class="flex-1">
            <template #label>
              <FormLabel>Kandang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              v-model="formState.coop"
              placeholder="Pilih Kandang"
              :options="coop || []"
              :input-class="'input-select-trigger'"
              :option-attribute="'label'"
              :value-attribute="'value'"
            />
          </UFormGroup>
          <UFormGroup label="Periode" name="periode" class="flex-1">
            <template #label>
              <FormLabel>Periode</FormLabel>
            </template>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UInput
                :ui="{
                  padding: {
                    md: 'py-[12px] px-5',
                  },
                }"
                :value="periodText"
                class="w-full"
                variant="outline"
                placeholder="Pilih Periode"
              />
              <template #panel>
                <BaseDatepicker
                  v-model="(formState.periode as any)"
                  inline
                  auto-apply
                  :month-picker="true"
                />
              </template>
            </UPopover>
          </UFormGroup>
          <UFormGroup name="file" label="" v-if="!formState.file">
            <template #label>
              <FormLabel style="display: none">File</FormLabel>
            </template>
            <label
              for="file"
              class="focus:outline-none focus-visible:outline-0 disabled:opacity-75 flex-shrink-0 rounded-md text-base font-medium gap-x-2 py-3 px-5 text-[--app-primary-100] ring-[--app-primary-100] ring-1 bg-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed inline-flex items-center cursor-pointer"
            >
              <span>Pilih File</span>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              class="hidden"
              @change="handleSelectFile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </UFormGroup>
          <div
            class="p-5 rounded-lg border border-[#E5E7EB] flex items-center space-x-4"
            v-else
          >
            <IconExcel />
            <div class="flex-1 max-w-[411px]">
              <p
                class="mb-2 text-base font-normal leading-6 text-[--app-dark-100] whitespace-normal"
              >
                {{ (formState.file as any)?.name || "" }}
              </p>
              <div
                class="relative overflow-hidden h-1 bg-[#DFE4EA] rounded-full w-full"
              >
                <div
                  class="absolute top-0 left-0 bottom-0 bg-[#22AD5C]"
                  :style="{
                    width: progress + '%',
                  }"
                />
              </div>
            </div>
            <button type="button" @click="formState.file = undefined">
              <IconTrash :stroke="'#F23030'" />
            </button>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="$emit('handleHideModal')"
            type="button"
            color="sky"
            variant="ghost"
            size="md"
            :ui="{ ...UI_GHOST_BUTTON_STYLES }"
          >
            Batal
          </UButton>
          <UButton
            :disabled="isLoading"
            type="submit"
            size="md"
            color="primary"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
            >{{ isLoading ? "Mengunggah" : "Upload" }}</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>

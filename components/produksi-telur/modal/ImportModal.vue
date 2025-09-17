<script setup lang="ts">
import { type InferType, mixed, object } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import { ASYNC_KEY } from "~/constants/api";
import type { UploadEggResponse } from "~/types/egg";

const IMPORTANT_NOTES = [
  "File yang diupload berformat : .xls, .xlsx, .xlsm, .xltx, dan .xlsb",
  "Pastikan nama sheet di dalam excel adalah : RECORDING PRODUKSI atau sheet1 (ini yang akan dibaca oleh sistem)",
  "Jika gagal, cek ulang file yang diupload dan pastikan sudah sesuai",
];

const emit = defineEmits<{
  (e: "handleCloseModal"): void;
}>();

const FormSchema = object({
  coop: mixed().test(
    "required",
    "Nama Kandang tidak boleh kosong",
    (value: any) => {
      return value > 0 && !!value?.toString()?.length;
    }
  ),
  file: mixed().test("required", "File tidak boleh kosong", (value?: any) => {
    const file = value as File;
    return !!file?.name?.length;
  }),
});
type FormValue = InferType<typeof FormSchema>;

const formState = reactive<FormValue>({
  coop: undefined,
  file: undefined,
});
const { getKandangOptions } = useKandang();
const {
  isLoading: isLoadingUploadData,
  handleUploadEggDataByCoop,
  formStep,
  progress,
} = useUploadEggData();

const { data } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  {
    lazy: true,
  }
);

const handleSelectFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = (target.files || [])[0];
  formState.file = file;
};

async function onSubmit(event: FormSubmitEvent<FormValue>) {
  if (!formState.coop || !formState.file) return;
  handleUploadEggDataByCoop({
    coopId: event.data?.coop as any,
    file: event.data?.file as any,
  });
}
</script>

<template>
  <UForm
    class="space-y-4"
    :schema="FormSchema"
    :state="formState"
    @submit="onSubmit"
  >
    <UCard :ui="UI_CARD_STYLES">
      <template #header>
        <div
          class="w-full flex justify-between items-center pb-6 mb-6 border-b"
        >
          <h2
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]"
          >
            Import Data
          </h2>
          <UButton
            @click="$emit('handleCloseModal')"
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
              :options="data || []"
              :input-class="'input-select-trigger'"
              :option-attribute="'label'"
              :value-attribute="'value'"
            />
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

          <div class="p-3 bg-[#F3F4F6]">
            <p class="text-base font-semibold text-[#637381] mb-3">
              Info Penting!!
            </p>
            <ol
              class="list-decimal list-outside rounded-[12px] space-y-3 notes"
            >
              <li
                v-for="(note, index) in IMPORTANT_NOTES"
                :key="index"
                class="text-sm text-[#637381]"
              >
                {{ note }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="$emit('handleCloseModal')"
            type="button"
            color="sky"
            variant="ghost"
            size="md"
            :ui="{ ...UI_GHOST_BUTTON_STYLES }"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            size="md"
            color="primary"
            :disabled="isLoadingUploadData"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
            >{{ isLoadingUploadData ? "Mengunggah..." : "Upload" }}</UButton
          >
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<style scoped>
ol.notes {
  list-style: none;
  counter-reset: my-awesome-counter;
}
ol.notes li {
  counter-increment: my-awesome-counter;
  position: relative;
  padding-left: 36px;
}
ol.notes li::before {
  content: counter(my-awesome-counter);
  background: #2cd673;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
  line-height: 26px;
  color: white;
  text-align: center;
  margin-right: 0.5rem;
  position: absolute;
  top: -5px;
  left: 0;
}
</style>

<script setup lang="ts">
import { mixed, type InferType, string, object } from "yup";
import { type DiagnosisKandang } from "~/types/report";
import type { FormSubmitEvent } from "#ui/types";

const emits = defineEmits<{
  (e: "handleAddReport", data: FormValueType): void;
  (e: "handleCloseModal"): void;
}>();
const KandangOptions = [
  { label: "Kandang Jatisari", value: "100000051" },
  { label: "Kandang Wanaraya", value: "100000052" },
];

const schema = object({
  cageName: mixed().test(
    "Required",
    "Nama Kandang tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  disease: string().required("Penyakit tidak boleh kosong."),
  date: string().required("Tanggal tidak boleh kosong."),
});
type FormValueType = InferType<typeof schema>;

const form = ref();
const state = reactive({
  cageName: undefined,
  date: undefined,
  disease: undefined,
});

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  emits("handleAddReport", data);
  emits("handleCloseModal");
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UCard
      :ui="{
        ring: '',
        divide: '',
        rounded: 'rounded-[14px]',
        shadow: '',
        body: {
          base: 'mb-[50px]',
          background: '',
          padding: 'px-10',
        },
        header: {
          base: '',
          background: '',
          padding: 'px-10 pt-10',
        },
        footer: {
          base: '',
          background: '',
          padding: 'px-10 pb-10',
        },
      }"
    >
      <template #header>
        <div
          class="w-full flex justify-between items-center pb-6 mb-6 border-b"
        >
          <h2
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]"
          >
            Tambah Laporan
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
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup name="cageName" label="Nama Kandang" class="flex-1">
            <template #label>
              <FormLabel>Nama Kandang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="state.cageName"
              :options="KandangOptions"
              placeholder="Pilih Nama Kandang"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup label="ID Kandang" class="flex-1">
            <template #label>
              <FormLabel>ID Kandang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="state.cageName"
              :options="KandangOptions"
              option-attribute="value"
              value-attribute="value"
              placeholder="Pilih Nama Kandang"
              :input-class="'input-select-trigger'"
              :disabled="true"
            />
          </UFormGroup>
        </div>
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup label="Tanggal" name="date" class="flex-1">
            <template #label>
              <FormLabel>Tanggal</FormLabel>
            </template>
            <template #default="{ error }">
              <Datepicker
                v-model:model-value="state.date"
                placeholder="Pilih Tanggal"
                :errorState="error"
              />
            </template>
            <template #error="{ error }">
              <span v-if="error" :class="[error ? 'text-red-500' : '']">
                {{ error }}
              </span>
            </template>
          </UFormGroup>
          <div class="opacity-0 invisible flex-1 h-0"></div>
        </div>
        <UFormGroup name="disease" label="Penyakit">
          <template #label>
            <FormLabel>Penyakit</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Penyakit"
            v-model="state.disease"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="$emit('handleCloseModal')"
            type="button"
            color="sky"
            variant="ghost"
            size="md"
            :ui="{
              strategy: 'override',
              padding: {
                md: 'py-[13px] px-7',
              },
              color: {
                sky: {
                  ghost:
                    'bg-white text-[--app-dark-100] disabled:cursor-not-allowed ring-1 ring-[#DFE4EA]',
                },
              },
            }"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            size="md"
            :ui="{
              strategy: 'override',
              padding: {
                md: 'py-[13px] px-7',
              },
              color: {
                primary: {
                  solid:
                    'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
                },
              },
            }"
          >
            Tambah
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

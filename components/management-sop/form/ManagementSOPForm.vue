<script setup lang="ts">
import { object, array, string, type InferType, mixed, number } from "yup";
import { ROLE_OPTIONS } from "~/constants/ui";
import type { FormSubmitEvent } from "#ui/types";

const emits = defineEmits(["handleCloseModal", "handleSuccessAddData"]);

const TimeSchema = object({
  hours: number().test("Required", "Waktu tidak boleh kosong", (value) => {
    !!value?.toString()?.length;
  }),
  minutes: number().test("Required", "Waktu tidak boleh kosong", (value) => {
    !!value?.toString()?.length;
  }),
  seconds: number().test("Required", "Waktu tidak boleh kosong", (value) => {
    !!value?.toString()?.length;
  }),
});

const Schema = object({
  userType: mixed().test(
    "Required",
    "User tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  time: mixed().test("Required", "Tidak boleh kosong", (value: any) => {
    return value?.length === 2;
  }),
  title: string().required("Judul kegiatan tidak boleh kosong."),
  description: string().nullable().default(""),
});

type FormValueType = InferType<typeof Schema>;

const formState = reactive<FormValueType>({
  userType: undefined,
  time: undefined,
  title: "",
  description: "",
});

function handleCloseModal() {
  formState.userType = undefined;
  formState.time = undefined;
  formState.title = "";
  formState.description = "";
  emits("handleCloseModal");
}

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  console.log(event.data);
  emits("handleCloseModal");
}
</script>

<template>
  <UForm
    class="space-y-4"
    :schema="Schema"
    :state="formState"
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
            Tambah SOP
          </h2>
          <UButton
            @click="handleCloseModal"
            type="button"
            icon="i-heroicons-x-circle"
            class="bg-white text-[#292D32] [&>span]:w-6 [&>span]:h-6"
          />
        </div>
      </template>
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup name="userType" label="Diberikan ke" class="flex-1">
            <template #label>
              <FormLabel>Diberikan ke</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.userType"
              :options="
                ROLE_OPTIONS.filter(
                  (item) =>
                    item.label === 'Anak Kandang' || item.label === 'Mandor'
                )
              "
              placeholder="Diberikan ke"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup label="Pukul Kegiatan" name="time" class="flex-1">
            <template #label>
              <FormLabel>Pukul Kegiatan</FormLabel>
            </template>
            <template #default="{ error }">
              <Timepicker
                v-model:model-value="formState.time"
                placeholder="Pilih waktu"
                :errorState="error"
              />
            </template>
            <template #error="{ error }">
              <span :class="[error ? 'text-red-500' : '']">
                {{ error }}
              </span>
            </template>
          </UFormGroup>
        </div>
        <UFormGroup name="title" label="Judul Kegiatan">
          <template #label>
            <FormLabel>Judul Kegiatan</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Tulis Judul Kegiatan"
            v-model="formState.title"
          />
        </UFormGroup>
        <UFormGroup name="description" label="Deskripsi Kegiatan (opsional)">
          <template #label>
            <FormLabel>Deskripsi Kegiatan (opsional)</FormLabel>
          </template>
          <UTextarea
            variant="outline"
            placeholder="Tulis Deskripsi Kegiatan"
            v-model="formState.description as string"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="handleCloseModal"
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

<script setup lang="ts">
import { mixed, type InferType, string, object } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleSubmitForm", data: FormValueType): void;
}>();

const schema = object({
  medicine: mixed().test(
    "Required",
    "Obat tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  dosis: string().required("Dosis tidak boleh kosong."),
  progress: mixed().test(
    "Required",
    "Progress tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
});

type FormValueType = InferType<typeof schema>;

const formState = reactive({
  medicine: undefined,
  dosis: undefined,
  progress: undefined,
});

const KandangOptions = [
  { label: "Kandang Jatisari", value: "100000051" },
  { label: "Kandang Wanaraya", value: "100000052" },
];
const form = ref();

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  emits("handleSubmitForm", data);
  emits("handleCloseModal");
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="formState"
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
            Tangani Laporan
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
          <UFormGroup name="medicine" label="Obat yg diberikan" class="flex-1">
            <template #label>
              <FormLabel>Obat yg diberikan</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.medicine"
              :options="KandangOptions"
              placeholder="Pilih Obat yg diberikan"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup name="dosis" label="Dosis yg diberikan" class="flex-1">
            <template #label>
              <FormLabel>Dosis yg diberikan</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Dosis yg diberikan"
              v-model="formState.dosis"
            />
          </UFormGroup>
        </div>
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup name="progress" label="Progress" class="flex-1">
            <template #label>
              <FormLabel>Progress</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.progress"
              :options="KandangOptions"
              placeholder="Pilih Progress"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <div class="opacity-0 invisible flex-1 h-0"></div>
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

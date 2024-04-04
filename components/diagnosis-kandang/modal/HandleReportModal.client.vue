<script setup lang="ts">
import { mixed, type InferType, string, object } from "yup";
import { type DiagnosisKandang } from "~/types/report";
import type { FormSubmitEvent } from "#ui/types";

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

const { showFormModal, formState: state } = useHandleReportModal();
const KandangOptions = [
  { label: "Kandang Jatisari", value: "100000051" },
  { label: "Kandang Wanaraya", value: "100000052" },
];
const form = ref();

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  showFormModal.value = false;
}
</script>

<template>
  <UModal
    v-model="showFormModal"
    :prevent-close="true"
    :ui="{
      strategy: 'override',
      width: 'w-full max-w-[343px] md:max-w-[500px]',
      container: 'flex min-h-full items-center justify-center text-center',
    }"
  >
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
            padding: 'px-4',
          },
          header: {
            base: '',
            background: '',
            padding: 'px-4 pt-5',
          },
          footer: {
            base: '',
            background: '',
            padding: 'px-4 pb-4',
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
              @click="showFormModal = false"
              type="button"
              icon="i-heroicons-x-circle"
              class="bg-white text-[#292D32] [&>span]:w-6 [&>span]:h-6"
            />
          </div>
        </template>
        <div class="space-y-6">
          <UFormGroup name="medicine" label="Obat yg diberikan">
            <template #label>
              <FormLabel>Obat yg diberikan</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="state.medicine"
              :options="KandangOptions"
              placeholder="Pilih Obat yg diberikan"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup name="dosis" label="Dosis yg diberikan">
            <template #label>
              <FormLabel>Dosis yg diberikan</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Dosis yg diberikan"
              v-model="state.dosis"
            />
          </UFormGroup>
          <UFormGroup name="progress" label="Progress">
            <template #label>
              <FormLabel>Progress</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="state.progress"
              :options="KandangOptions"
              placeholder="Pilih Progress"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end items-center space-x-[18px]">
            <UButton
              @click="showFormModal = false"
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
  </UModal>
</template>

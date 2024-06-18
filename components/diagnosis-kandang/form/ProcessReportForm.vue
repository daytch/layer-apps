<script setup lang="ts">
import { mixed, type InferType, string, object, number } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { UI_CARD_STYLES, UI_GHOST_BUTTON_STYLES, UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import { ASYNC_KEY } from "~/constants/api";
import type { DiagnosisKandangPayload } from "~/types/report";

const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleSubmitForm", data: DiagnosisKandangPayload): void;
}>();
defineProps<{
  isLoading?: boolean;
}>();

const schema = object({
  medicine: mixed().test("required", "Jenis obat tidak boleh kosong", (value) => {
    const jenisObatValue = value as number;
    return !!jenisObatValue?.toString().length;
  }),
  dosis: mixed().test("required", "Dosis obat tidak boleh kosong", (value) => {
    const dosisObatValue = value as number;

    return dosisObatValue > 0 && !!dosisObatValue?.toString().length;
  }),
  progress: mixed().test(
    "Required",
    "Progress tidak boleh kosong.",
    (value: any) => !!value?.length
  ),
});

type FormValueType = InferType<typeof schema>;

const formState = reactive({
  medicine: undefined,
  dosis: undefined,
  progress: undefined,
});

const { getAllFoodMedicineStock } = useFetchFoodMedicine();

const { data: foods } = await useAsyncData(
  ASYNC_KEY.foodMedicine,
  async () => getAllFoodMedicineStock(),
  { lazy: true }
);
const PROGRESS_OPTIONS = [
  {
    label: "Belum Lapor PPL",
    value: "Belum Lapor PPL",
  },
  {
    label: "Sudah Lapor PPL",
    value: "Sudah Lapor PPL",
  },
];
const form = ref();

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  const payload: DiagnosisKandangPayload = {
    medicineId: data.medicine as any,
    dose: data.dosis as any,
    status: data.progress as any,
  };
  emits("handleSubmitForm", payload);
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="formState" class="space-y-4" @submit="onSubmit">
    <UCard :ui="{ ...UI_CARD_STYLES }">
      <template #header>
        <div class="w-full flex justify-between items-center pb-6 mb-6 border-b">
          <h2 class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]">
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
              :options="foods || []"
              placeholder="Pilih Obat yg diberikan"
              :input-class="'input-select-trigger'"
              :value-attribute="'id'"
              :option-attribute="'name'"
            />
          </UFormGroup>
          <UFormGroup name="dosis" label="Dosis yg diberikan" class="flex-1">
            <template #label>
              <FormLabel>Dosis yg diberikan</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Dosis yg diberikan"
              type="number"
              v-model="formState.dosis"
              :min="0"
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
              :options="PROGRESS_OPTIONS"
              placeholder="Pilih Progress"
              :input-class="'input-select-trigger'"
              :value-attribute="'value'"
              :option-attribute="'label'"
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
            :ui="{ ...UI_GHOST_BUTTON_STYLES }"
          >
            Batal
          </UButton>
          <UButton
            :disabled="isLoading"
            type="submit"
            size="md"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
          >
            {{ isLoading ? "Menyimpang..." : "Tambah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

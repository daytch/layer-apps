<script setup lang="ts">
import { type InferType, string, object, number } from "yup";
import { type DiagnosisKandangPayload } from "~/types/report";
import type { FormSubmitEvent } from "#ui/types";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import { ASYNC_KEY } from "~/constants/api";

const emits = defineEmits<{
  (e: "handleAddReport", data: DiagnosisKandangPayload): void;
  (e: "handleCloseModal"): void;
}>();
defineProps<{ isLoading?: boolean }>();

const { getKandangOptions } = useKandang();

const { data } = await useAsyncData(ASYNC_KEY.KANDANG_OPTIONS, async () =>
  getKandangOptions()
);

const authuser = useAuthUser();
const schema = object({
  coopName: string().required("Nama kandang tidak boleh kosong."),
  coopId: number().min(1, "ID kandang tidak boleh kosong."),
  disease: string().required("Deskripsi penyakit tidak boleh kosong."),
  transDate: string().required("Tanggal tidak boleh kosong."),
});
type FormValueType = InferType<typeof schema>;

const form = ref();
const state = reactive<FormValueType>({
  coopName: "",
  coopId: undefined,
  disease: "",
  transDate: "",
});

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  if (!data?.coopId || !authuser?.value?.user) return;
  const payload: DiagnosisKandangPayload = {
    coopId: data.coopId,
    transDate: isValidDate(data?.transDate)
      ? formatDate(data?.transDate, "yyyy-MM-dd")
      : "",
    disease: data.disease,
    reporterId: authuser?.value?.user?.id,
  };
  emits("handleAddReport", payload);
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
    <UCard :ui="{ ...UI_CARD_STYLES }">
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
          <UFormGroup name="coopName" label="Nama Kandang" class="flex-1">
            <template #label>
              <FormLabel>Nama Kandang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              :model-value="state.coopName"
              @update:model-value="
                (value: any) => {
                  const coopId = data?.find((d) => d.label === value)?.value;
                  state.coopId = coopId;
                  state.coopName = value;
                }
              "
              :options="data || []"
              placeholder="Pilih Nama Kandang"
              :input-class="'input-select-trigger'"
              :value-attribute="'label'"
              :option-attribute="'label'"
            />
          </UFormGroup>
          <UFormGroup label="ID Kandang" class="flex-1" name="coopId">
            <template #label>
              <FormLabel>ID Kandang</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="ID Kandang"
              :model-value="state.coopId"
              :disabled="true"
            />
          </UFormGroup>
        </div>
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup label="Tanggal" name="transDate" class="flex-1">
            <template #label>
              <FormLabel>Tanggal</FormLabel>
            </template>
            <template #default="{ error }">
              <Datepicker
                v-model:model-value="state.transDate"
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
          <div class="opacity-0 invisible flex-1 h-0 hidden md:block"></div>
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
            :ui="{ ...UI_GHOST_BUTTON_STYLES }"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            size="md"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
            :disabled="isLoading"
          >
            {{ isLoading ? "Menyimpan..." : "Tambah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

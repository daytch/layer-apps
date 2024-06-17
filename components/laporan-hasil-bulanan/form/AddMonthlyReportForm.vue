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

const { data: coop } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  {
    lazy: true,
  }
);
const formState = reactive<MonthlyReportSchemaFormType>({
  coop: undefined,
  periode: undefined,
  total: 0,
});

const handleSubmit = async (
  event: FormSubmitEvent<MonthlyReportSchemaFormType>
) => {
  console.log(event.data);
  emits("handleHideModal");
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
        <UFormGroup name="coop" label="Nama Kandang">
          <template #label>
            <FormLabel>Nama Kandang</FormLabel>
          </template>
          <UInputMenu
            size="md"
            :nullable="true"
            v-model="formState.coop"
            :options="coop || []"
            placeholder="Pilih Nama Kandang"
            :input-class="'input-select-trigger'"
          />
        </UFormGroup>
        <UFormGroup name="periode" label="Periode">
          <template #label>
            <FormLabel>Periode</FormLabel>
          </template>
          <template #default="{ error }">
            <Datepicker
              v-model:model-value="(formState.periode as any)"
              placeholder="Pilih Periode"
              :errorState="error"
              month-picker
            />
          </template>
          <template #error="{ error }">
            <span v-if="error" :class="[error ? 'text-red-500' : '']">
              {{ error }}
            </span>
          </template>
        </UFormGroup>
        <UFormGroup name="total" label="Total">
          <template #label>
            <FormLabel>Total</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Masukkan total"
            v-model="formState.total"
            type="number"
          />
        </UFormGroup>
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
            type="submit"
            size="md"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
          >
            Tambah
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

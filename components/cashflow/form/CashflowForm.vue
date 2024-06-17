<script setup lang="ts">
import { object, number, mixed, type InferType } from "yup";
import type { CashflowDataType, CashflowPayloadType } from "~/types/cashflow";
import type { FormSubmitEvent } from "#ui/types";
import { UI_CARD_STYLES, UI_GHOST_BUTTON_STYLES, UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";

const props = defineProps<{
  defaultValue: CashflowDataType | undefined;
  totalCashflowValue: number;
  isLoading?: boolean;
}>();
const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleSuccessAddCashflow", item: CashflowPayloadType): void;
}>();

const TIPE_OPTIONS = [
  { label: "KREDIT", value: "KREDIT" },
  { label: "DEBIT", value: "DEBIT" },
];

const Schema = object({
  periode: mixed().test("Required", "Periode tidak boleh kosong", (value) => {
    const periodeValue = value as any;
    return !!periodeValue?.month?.toString()?.length;
  }),
  tipe: mixed().test(
    "Required",
    "Nama Kandang tidak boleh kosong.",
    (value: any) => !!value?.length
  ),
  amount: number().min(0, "Jumlah tidak boleh kosong.").typeError("Jumlah tidak valid."),
});
type CashflowFormType = InferType<typeof Schema>;

const formState = reactive<CashflowFormType>({
  periode: undefined,
  tipe: undefined,
  amount: 0,
});

const balance = computed(() => {
  let total = props.totalCashflowValue;
  if (!formState?.amount?.toString()?.length || formState.amount <= 0) return total;
  if (formState.tipe === props.defaultValue?.tipe) return total;
  if (formState.tipe === "KREDIT") {
    total = total - formState.amount;
  } else if (formState.tipe === "DEBIT") {
    total = total + formState.amount;
  }

  return total;
});

const form = ref();

onMounted(() => {
  if (!!props.defaultValue) {
    formState.amount = props.defaultValue.nominal;
    formState.tipe = props.defaultValue.tipe;
    if (isValidDate(props?.defaultValue?.periode)) {
      const periodeDate = new Date(props.defaultValue?.periode);
      formState.periode = {
        month: periodeDate.getMonth(),
        year: periodeDate.getFullYear(),
      };
    }
  }
});

async function onSubmit(event: FormSubmitEvent<CashflowFormType>) {
  const { data } = event;
  const monthValue = (data?.periode as any)?.month + 1;
  const month = monthValue < 10 ? `0${monthValue}` : monthValue;
  const periode = `${(data.periode as any)?.year}-${month}-01`;
  const tipe = data.tipe as any;
  const payload: CashflowPayloadType = {
    periode,
    tipe,
    nominal: data?.amount || 0,
  };
  emits("handleSuccessAddCashflow", payload);
}

const onCloseModal = () => {
  emits("handleCloseModal");
};
</script>

<template>
  <UForm ref="form" :schema="Schema" :state="formState" class="space-y-4" @submit="onSubmit">
    <UCard :ui="{ ...UI_CARD_STYLES }">
      <template #header>
        <div class="w-full flex justify-between items-center pb-6 mb-6 border-b">
          <h2 class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]">
            {{ !!defaultValue ? "Ubah" : "Tambah" }} Cashflow
          </h2>
          <UButton
            @click="onCloseModal"
            type="button"
            icon="i-heroicons-x-circle"
            class="bg-white text-[#292D32] [&>span]:w-6 [&>span]:h-6"
          />
        </div>
      </template>
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup name="periode" label="Periode" class="flex-1">
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
          <UFormGroup name="tipe" label="Tipe" class="flex-1">
            <template #label>
              <FormLabel>Tipe</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.tipe"
              :options="TIPE_OPTIONS"
              placeholder="Pilih Tipe"
              :input-class="'input-select-trigger'"
              :value-attribute="'value'"
              :option-attribute="'label'"
            />
          </UFormGroup>
        </div>
        <UFormGroup name="amount" label="Jumlah">
          <template #label>
            <FormLabel>Jumlah</FormLabel>
          </template>
          <UInput variant="outline" placeholder="Jumlah" v-model="formState.amount" type="number" />
        </UFormGroup>
        <UFormGroup name="balance" label="Saldo Sekarang">
          <template #label>
            <FormLabel>Saldo Sekarang</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Saldo Sekarang"
            :model-value="balance"
            type="number"
            :disabled="true"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="onCloseModal"
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
            {{ isLoading ? "Menyimpan" : !!defaultValue ? "Ubah" : "Tambah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

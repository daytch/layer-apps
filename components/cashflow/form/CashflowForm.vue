<script setup lang="ts">
import { object, string, number, mixed, type InferType } from "yup";
import type { CashflowDataType } from "~/types/cashflow";
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  defaultValue: CashflowDataType | undefined;
}>();
const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleSuccessAddCashflow", item: CashflowDataType): void;
}>();

const TIPE_OPTIONS = [
  { label: "KREDIT", value: "KREDIT" },
  { label: "DEBIT", value: "DEBIT" },
];

const Schema = object({
  periode: string().required("Periode tidak boleh kosong."),
  tipe: mixed().test(
    "Required",
    "Nama Kandang tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  amount: number()
    .required("Jumlah tidak boleh kosong")
    .positive("Jumlah tidak boleh negatif.")
    .integer(),
  balance: number()
    .required("Saldo tidak boleh kosong")
    .positive("Saldo tidak boleh negatif.")
    .integer(),
});
type CashflowFormType = InferType<typeof Schema>;

const formState = reactive<CashflowFormType>({
  periode: "",
  tipe: undefined,
  amount: 0,
  balance: 0,
});
const form = ref();

onMounted(() => {
  if (!!props?.defaultValue) {
    formState.amount = props?.defaultValue?.nominal;
    formState.balance = props?.defaultValue?.total;
    (formState.periode = props?.defaultValue?.periode),
      (formState.tipe = TIPE_OPTIONS?.find(
        (item) => item.value === props?.defaultValue?.tipe
      ));
  }
});

async function onSubmit(event: FormSubmitEvent<CashflowFormType>) {
  const { data } = event;
  console.log(data);
}

const onCloseModal = () => {
  (formState.periode = ""), (formState.tipe = undefined);
  formState.amount = 0;
  formState.balance = 0;
  emits("handleCloseModal");
};
</script>

<template>
  <UForm
    ref="form"
    :schema="Schema"
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
            {{ !!defaultValue ? "Update" : "Tambah" }} Laporan
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
            />
          </UFormGroup>
        </div>
        <UFormGroup name="amount" label="Jumlah">
          <template #label>
            <FormLabel>Jumlah</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Jumlah"
            v-model="formState.amount"
            type="number"
          />
        </UFormGroup>
        <UFormGroup name="balance" label="Saldo Sekarang">
          <template #label>
            <FormLabel>Saldo Sekarang</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Saldo Sekarang"
            v-model="formState.balance"
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

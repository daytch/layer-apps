<script setup lang="ts">
import { object, string, type InferType, mixed, number } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { FoodMedicineStock } from "~/types/food-medicine-stock";

const emits = defineEmits<{
  (e: "handleAddStock", item: Omit<FoodMedicineStock, "id">): void;
}>();

const KandangOptions = [
  { label: "Kandang Jatisari", value: "kandang-jatisari" },
  { label: "Kandang Wanaraya", value: "kandang-wanaraya" },
];
const NamaBarangOptions = [{ label: "Stres Block", value: "stres-block" }];

const schema = object({
  cageName: mixed().test(
    "Required",
    "Nama Kandang tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  itemName: mixed().test(
    "Required",
    "Nama Barang tidak boleh kosong.",
    (value: any) => !!value?.value?.length
  ),
  itemID: string().required("ID Barang tidak boleh kosong"),
  price: number()
    .required("Harga Persatuan tidak boleh kosong.")
    .positive("Harga Persatuan tidak valid."),
  quantity: number()
    .required("Jumlah tidak boleh kosong.")
    .positive("Jumlah harus lebih dari -1"),
});

type Schema = InferType<typeof schema>;

const form = ref();
const { showFormModal, formState: state } = useFoodMedicineStockForm();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data } = event;
  emits("handleAddStock", {
    cageName: (data?.cageName as any)?.label || "",
    itemName: (data?.itemName as any)?.label || "",
    itemID: data.itemID,
    pricePerItem: data.price,
    quantityItem: data.quantity,
    createdDate: new Date(),
  });
  showFormModal.value = false;
}
</script>

<template>
  <UModal
    :ui="{
      strategy: 'override',
      width: 'w-full max-w-[343px] md:max-w-[500px]',
      container: 'flex min-h-full items-center justify-center text-center',
    }"
    v-model="showFormModal"
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
          shadow: 'shadow-lg',
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
              Tambah Data
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
          <UFormGroup name="cageName" label="Nama Kandang">
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
          <UFormGroup name="itemName" label="Nama Barang">
            <template #label>
              <FormLabel>Nama Barang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              v-model="state.itemName"
              :nullable="true"
              :options="NamaBarangOptions"
              placeholder="Pilih Nama Barang"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup name="itemID" label="ID Barang">
            <template #label>
              <FormLabel>ID Barang</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Masukkan ID Barang"
              v-model="state.itemID"
            />
          </UFormGroup>
          <UFormGroup name="price" label="Harga Persatuan">
            <template #label>
              <FormLabel>Harga Persatuan</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Harga Persatuan"
              v-model="state.price"
            >
              <template #leading>
                <span class="text-gray-500 dark:text-gray-400 text-xs">Rp</span>
              </template></UInput
            >
          </UFormGroup>
          <UFormGroup name="quantity" label="Value Qty.">
            <template #label>
              <FormLabel>Value Qty.</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Value Qty."
              v-model="state.quantity"
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

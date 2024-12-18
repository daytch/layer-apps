<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import { OBAT_SCHEMA, type FormValueObat } from "~/schemas/obat";
import type {
  FoodMedicineStockPayloadType,
  FoodMedicineStockType,
} from "~/types/food-medicine-stock";

const emit = defineEmits<{
  (e: "handleHideModal"): void;
  (
    e: "handleAddStock",
    data: FoodMedicineStockPayloadType & { coop_name: string }
  ): void;
}>();
const props = defineProps<{
  defaultValue?: FoodMedicineStockType;
  isSubmitting?: boolean;
}>();

const formState = reactive<FormValueObat>({
  price: 0,
  quantity: 0,
  total: 0,
  name: "",
  coop: undefined,
  uom: "",
  SKU: "",
});
const authUser = useAuthUser();
const { getKandangOptions } = useKandang();
const { data } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  {
    lazy: true,
  }
);
const { createNewStock, updateStockById } = useFetchFoodMedicine();

onMounted(() => {
  if (!!props?.defaultValue) {
    formState.SKU = props?.defaultValue?.SKU;
    formState.name = props?.defaultValue?.name;
    formState.price = props?.defaultValue?.price;
    (formState.total = props?.defaultValue?.total),
      (formState.quantity = props?.defaultValue?.quantity);
    formState.uom = props?.defaultValue?.uom;
    formState.coop = {
      value: props?.defaultValue?.coopId,
      label: props?.defaultValue?.coop_name,
    };
  }
});

const handleAddFoodMedicine = async (event: FormSubmitEvent<FormValueObat>) => {
  const { user } = authUser.value;
  if (!user?.id) return;
  const { name, coop, quantity, total, SKU, price, uom } = event.data;
  const { value, label } = coop as any;
  const payload = {
    name,
    quantity,
    total,
    SKU,
    price,
    uom,
    coopId: value,
    userId: user.id,
    coop_name: label,
  };
  emit("handleAddStock", payload);
};
</script>

<template>
  <UForm
    :schema="OBAT_SCHEMA"
    :state="formState"
    class="space-y-4"
    @submit="handleAddFoodMedicine"
  >
    <UCard :ui="{ ...UI_CARD_STYLES }">
      <template #header>
        <div
          class="w-full flex justify-between items-center pb-6 mb-6 border-b"
        >
          <h2
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]"
          >
            {{ !!defaultValue ? "Ubah" : "Tambah" }} Data
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
            :options="data || []"
            placeholder="Pilih Nama Kandang"
            :input-class="'input-select-trigger'"
          />
        </UFormGroup>
        <div class="sm:flex items-start space-y-6 sm:space-x-10 sm:space-y-0">
          <UFormGroup name="name" label="Nama Barang" class="flex-1">
            <template #label>
              <FormLabel>Nama Barang</FormLabel>
            </template>
            <UInput
              size="md"
              v-model="formState.name"
              variant="outline"
              placeholder="Masukkan ID Barang"
            />
          </UFormGroup>
          <UFormGroup name="SKU" label="SKU Barang" class="flex-1">
            <template #label>
              <FormLabel>ID Barang</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Masukkan SKUD Barang"
              v-model="formState.SKU"
            />
          </UFormGroup>
        </div>
        <div class="sm:flex items-center space-y-6 sm:space-x-10 sm:space-y-0">
          <UFormGroup name="price" label="Harga Persatuan" class="flex-1">
            <template #label>
              <FormLabel>Harga Persatuan</FormLabel>
            </template>
            <CurrencyInput
              :model-value="formState.price"
              @update:model-value="(value: any) => formState.price = value"
              placeholder="Harga Persatuan"
            />
          </UFormGroup>
          <UFormGroup name="uom" label="Satuan" class="flex-1">
            <template #label>
              <FormLabel>Satuan</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Satuan"
              v-model="formState.uom"
            />
          </UFormGroup>
        </div>
        <div class="sm:flex items-center space-y-6 sm:space-x-10 sm:space-y-0">
          <UFormGroup name="total" label="Total Barang" class="flex-1">
            <template #label>
              <FormLabel>Total Barang</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Total Barang"
              v-model="formState.total"
            />
          </UFormGroup>
          <UFormGroup name="quantity" label="Value Qty." class="flex-1">
            <template #label>
              <FormLabel>Value Qty.</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Value Qty."
              v-model="formState.quantity"
            />
          </UFormGroup>
        </div>
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

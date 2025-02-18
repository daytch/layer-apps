<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import {
  USAGE_FOOD_MEDICINE_HISTORY,
  type FormValueUsageFoodMedicine,
} from "~/schemas/obat";
import type { FeedMedicConsumptionPayloadType } from "~/types/food-medicine-stock";

const emits = defineEmits<{
  (e: "handleAddReport", data: FeedMedicConsumptionPayloadType): void;
  (e: "handleCloseModal"): void;
}>();
defineProps<{ isLoading?: boolean }>();

const { getKandangOptions } = useKandang();
const { getFeedDropdownSOP } = useFetchFoodMedicine();

const formState = reactive<FormValueUsageFoodMedicine>({
  coop: undefined as any,
  stockFood: -1,
  total: undefined as any,
  transDate: undefined as any,
  food: undefined as any,
});
const coopRef = toRef(formState, "coop");
const { data: coops } = await useAsyncData(
  ASYNC_KEY.KANDANG_OPTIONS,
  async () => getKandangOptions(),
  {
    lazy: true,
  }
);
const { data: foods } = await useAsyncData(
  `REPORT_FORM_MEDIC_OPTIONS_BY_COOP-${coopRef.value}`,
  async () => {
    if (!coopRef.value) return;
    return getFeedDropdownSOP({ coopId: coopRef.value?.toString() });
  },
  { lazy: true, watch: [coopRef] }
);

async function onSubmit(event: FormSubmitEvent<FormValueUsageFoodMedicine>) {
  const { data } = event;
  const payload = {} as FeedMedicConsumptionPayloadType;
  if (payload["coopId"] && !isNaN(payload["coopId"])) {
    payload["coopId"] = Number(data.coop);
  }
  if (payload["feedId"] && !isNaN(payload["feedId"])) {
    payload["feedId"] = Number(data.food);
  }
  (payload["transDate"] = isValidDate(data?.transDate)
    ? formatDate(data?.transDate, "yyyy-MM-dd")
    : ""),
    (payload["total"] = data.total);
  emits("handleAddReport", payload);
}
</script>

<template>
  <UForm
    ref="form"
    :state="formState"
    :schema="USAGE_FOOD_MEDICINE_HISTORY"
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
            Tambah Data
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
        <pre>{{ JSON.stringify(formState, null, 2) }}</pre>
        <div class="flex flex-col gap-x-6 gap-y-6">
          <UFormGroup label="Kandang" name="coop" class="flex-1">
            <template #label>
              <FormLabel>Kandang</FormLabel>
            </template>
            <UInputMenu
              size="md"
              v-model="formState.coop"
              placeholder="Pilih Kandang"
              :options="coops || []"
              :input-class="'input-select-trigger'"
              :option-attribute="'label'"
              :value-attribute="'value'"
            />
          </UFormGroup>
        </div>
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup
            name="food"
            label="Jenis Pakan yg diberikan"
            class="flex-1"
          >
            <template #label>
              <FormLabel>Jenis Pakan yg diberikan</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              :disabled="!formState?.coop"
              :modelValue="formState.food"
              @update:modelValue="(value: number) => {
                const selectedMedic = foods?.find((f) => f.id === value)
                formState.food = value 
                formState.stockFood = selectedMedic?.quantity ?? -1
              }"
              :options="foods || []"
              placeholder="Jenis Pakan yg diberikan"
              :input-class="'input-select-trigger'"
              :value-attribute="'id'"
              :option-attribute="'name'"
            />
          </UFormGroup>
          <UFormGroup
            name="total"
            label="Jumlah Pakan yg diberikan"
            class="flex-1"
          >
            <template #label>
              <FormLabel>Jumlah Pakan yg diberikan</FormLabel>
            </template>
            <UInput
              :disabled="!formState.food"
              variant="outline"
              placeholder="Jumlah Pakan yg diberikan"
              type="number"
              v-model="(formState.total as any)"
              :min="0"
            />
          </UFormGroup>
        </div>
        <div class="">
          <UFormGroup label="Tanggal" name="transDate" class="flex-1">
            <template #label>
              <FormLabel>Tanggal Traksaksi</FormLabel>
            </template>
            <template #default="{ error }">
              <Datepicker
                v-model:model-value="formState.transDate"
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

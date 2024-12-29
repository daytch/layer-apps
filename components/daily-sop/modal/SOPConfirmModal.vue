<script setup lang="ts">
import { Schema, type FormType } from "~/schemas/daily-sop";
import type { FormSubmitEvent } from "#ui/types";
import {
  UI_PRIMARY_BUTTON_STYLES,
  UI_GHOST_BUTTON_STYLES,
} from "~/constants/ui";
import type { SOPDataType } from "~/types/sop";

const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (
    e: "handleConfirm",
    payload: {
      coopId: number;
      feedId?: number;
      qty?: number;
    }
  ): void;
}>();
const props = defineProps<{
  selectedSOPItem?: SOPDataType;
  isLoading?: boolean;
}>();
const { getFeedDropdownSOP } = useFetchFoodMedicine();
const { queryParams } = useQueryParams();

const { data } = await useAsyncData(
  "SOP_MANDOR_DROPDOWN_FEED",
  async () => {
    if (
      !queryParams.value["coopId"]?.length ||
      !props?.selectedSOPItem?.isReduceStock
    )
      return;
    const params = {} as Record<string, string>;
    if (!!queryParams.value["coopId"]?.length) {
      params["coopId"] = queryParams.value["coopId"]?.toString();
    }
    return getFeedDropdownSOP(params as any);
  },
  { lazy: true, watch: [queryParams, props] }
);

const formState = reactive<FormType>({
  feedId: 0,
  isReduceStock: true,
  stock: 0,
  qty: 0,
});
const form = ref();

async function onSubmit(event: FormSubmitEvent<FormType>) {
  const { data } = event;
  const payload = {} as Record<string, number>;
  if (
    queryParams.value["coopId"] &&
    !isNaN(Number(queryParams.value["coopId"]))
  ) {
    payload["coopId"] = Number(queryParams.value["coopId"]);
  }
  if (!!data.feedId) {
    payload["feedId"] = data.feedId;
  }
  if (!!data.qty) {
    payload["qty"] = data.qty;
  }
  emits("handleConfirm", payload as any);
}

onMounted(() => {
  if (props?.selectedSOPItem) {
    formState.isReduceStock = props?.selectedSOPItem?.isReduceStock || false;
  }
});
</script>

<template>
  <UForm
    ref="form"
    :schema="Schema"
    :state="formState"
    class="space-y-4"
    @submit="onSubmit"
  >
    <div class="px-6 py-6">
      <NuxtImg
        src="/images/dashboard/welcome-admin-illustration.png"
        format="webp"
        alt=""
        width="150"
        height="120"
        class="block mx-auto mb-6"
      />
      <h3
        class="text-lg text-black font-semibold leading-[26px] mb-3 text-center"
      >
        Sudah mengerjakan SOP ini?
      </h3>
      <p
        v-if="selectedSOPItem"
        class="text-[--app-dark-500] text-base font-normal leading-6 mb-6 text-center"
      >
        {{ selectedSOPItem?.title }}
      </p>
      <div class="space-y-6 mb-6" v-if="$props?.selectedSOPItem?.isReduceStock">
        <UFormGroup
          name="feedId"
          label="Pilih Pakan"
          class="w-full"
          :ui="{
            label: {
              wrapper: '',
            },
          }"
        >
          <template #label>
            <FormLabel class="mb-[10px]">Pilih Pakan</FormLabel>
            <UInputMenu
              size="md"
              :nullable="true"
              :modelValue="(formState.feedId as number)"
              @update:modelValue="(value: number) => {
                const selectedFeed = data?.find((f) => f.id === value)
                formState.feedId = value 
                formState.stock = selectedFeed?.quantity
              }"
              :options="data || []"
              placeholder="Pilih pakan yg diberikan"
              :input-class="'input-select-trigger'"
              :value-attribute="'id'"
              :option-attribute="'name'"
            />
          </template>
          <template #error="{ error }">
            <span
              v-if="error || (formState.stock && formState.stock > 0)"
              :class="[error ? 'text-red-500' : 'text-[#6B7280]']"
            >
              {{ error ? error : `Stok tersedia : ${formState?.stock}` }}
            </span>
          </template>
        </UFormGroup>
        <UFormGroup name="qty" label="Pilih Pakan" class="w-full">
          <template #label>
            <FormLabel>Berapa banyak</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Dosis yg diberikan"
            type="number"
            v-model="(formState.qty as any)"
            :min="0"
          />
        </UFormGroup>
      </div>

      <UButton
        block
        @click="() => form.submit()"
        size="md"
        :ui="{
          ...UI_PRIMARY_BUTTON_STYLES,
        }"
      >
        {{ isLoading ? "MENYIMPAN.." : "SUDAH" }}
      </UButton>
      <UButton
        @click="$emit('handleCloseModal')"
        type="button"
        color="sky"
        variant="ghost"
        block
        class="mt-[10px]"
        size="md"
        :ui="{ ...UI_GHOST_BUTTON_STYLES }"
      >
        BATAL
      </UButton>
    </div>
  </UForm>
</template>

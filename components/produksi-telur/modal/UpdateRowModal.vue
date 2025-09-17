<script setup lang="ts">
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import { type InferType, object, string, number } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { type UpdateRowFormType, type UpdateRowPayload } from "~/types/egg";

const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (e: "handleUpdateData", newValue: UpdateRowFormType): void;
}>();
const props = defineProps<{
  defaultValue: UpdateRowFormType;
}>();

const Schema = object({
  inputType: string().nullable().default(""),
  newValue: string()
    .required("Tidak boleh kosong")
    .when(["inputType"], {
      is: (value: string) => value === "number",
      then: () => number().min(0, "Nilai tidak valid"),
    })
    .when(["inputValue"], {
      is: (value: string) => {
        return value === "date";
      },
      then: () =>
        string()
          .required("Tidak boleh kosong")
          .typeError("Tidak boleh kosong."),
    }),
});
type FormType = InferType<typeof Schema>;

const { isLoading: isLoadingUpdateData, updateEggDataByRowId } =
  useFetchEggData();
const inputValue = reactive<FormType>({
  newValue: "",
  inputType: "",
});

onMounted(() => {
  inputValue.inputType = props.defaultValue?.type || "";
  if (
    props.defaultValue?.type === "date" &&
    isValidDate(props.defaultValue?.value as string)
  ) {
    inputValue.newValue = new Date(props.defaultValue?.value) as any;
  } else if (
    props.defaultValue?.type === "number" &&
    !isNaN(Number(props.defaultValue?.value))
  ) {
    inputValue.newValue = Number(props.defaultValue?.value) as any;
  } else {
    inputValue.newValue = props.defaultValue?.value as any;
  }
});

async function onSubmit(event: FormSubmitEvent<FormType>) {
  if (!props?.defaultValue) return;
  const payloadData: UpdateRowPayload = [
    {
      id: props.defaultValue.id,
      [props.defaultValue.key]: event.data.newValue,
    },
  ];
  await updateEggDataByRowId(payloadData).then((data) => {
    if (data) {
      emits("handleCloseModal");
    }
  });
}
</script>

<template>
  <UForm
    class="space-y-4"
    :schema="Schema"
    :state="inputValue"
    @submit="onSubmit"
    :no-validate="true"
  >
    <UCard :ui="UI_CARD_STYLES">
      <template #header>
        <div
          class="w-full flex justify-between items-center pb-6 mb-6 border-b"
        >
          <h2
            class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]"
          >
            Ubah Data
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
        <UFormGroup
          label="Ubah Data"
          name="newValue"
          class="flex-1"
          v-if="defaultValue?.type === 'date'"
        >
          <template #label>
            <FormLabel>Ubah Data</FormLabel>
          </template>
          <template #default="{ error }">
            <Datepicker
              v-model:model-value="(inputValue.newValue as any)"
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
        <UFormGroup
          name="newValue"
          v-else-if="defaultValue?.type === 'number'"
          label="Ubah Data"
          class="flex-1"
        >
          <template #label>
            <FormLabel>Ubah Data</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Ubah Data"
            type="number"
            v-model="(inputValue.newValue as any)"
          />
        </UFormGroup>
        <UFormGroup name="newValue" v-else label="Ubah Data" class="flex-1">
          <template #label>
            <FormLabel>Ubah Data</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Ubah Data"
            v-model="(inputValue.newValue as any)"
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
            :disabled="isLoadingUpdateData"
            size="md"
            :ui="UI_PRIMARY_BUTTON_STYLES"
          >
            {{ isLoadingUpdateData ? "Menyimpan..." : "Ubah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

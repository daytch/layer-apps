<script setup lang="ts">
import { object, string, type InferType, mixed } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { UI_CARD_STYLES, UI_GHOST_BUTTON_STYLES, UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import type { SOPDataType, SOPFormPayloadType } from "~/types/sop";
import { ROLES_OPTIONS_FORM } from "~/constants/role";

const ROLE_OPTIONS_FIELD = ROLES_OPTIONS_FORM.filter(
  (item) => item.label === "Anak Kandang" || item.label === "Mandor"
);

const emits = defineEmits<{
  (e: "handleCloseModal"): void;
  (
    e: "handleSuccessAddData",
    formData: { id?: number; roleName: string } & SOPFormPayloadType
  ): void;
}>();
const props = defineProps<{
  isLoading?: boolean;
  defaultFormValue?: SOPDataType;
}>();

const Schema = object({
  userType: mixed().test(
    "Required",
    "Role tidak boleh kosong.",
    (value: any) => !!value?.label?.length
  ),
  time: mixed().test("Required", "Tidak boleh kosong", (value: any) => {
    return value?.length === 2;
  }),
  title: string().required("Judul kegiatan tidak boleh kosong."),
  description: string().nullable().default(""),
});

type FormValueType = InferType<typeof Schema>;

const formState = reactive<FormValueType>({
  userType: undefined,
  time: undefined,
  title: "",
  description: "",
});

onMounted(() => {
  if (!!props?.defaultFormValue) {
    formState.userType = ROLE_OPTIONS_FIELD.find(
      (role) => role.value === props.defaultFormValue?.roleId
    );
    formState.title = props?.defaultFormValue?.title;
    formState.description = props?.defaultFormValue?.description;
    formState.time = changeAPIResponseToValidFormValue(props?.defaultFormValue?.time || "");
  }
});

function handleCloseModal() {
  formState.userType = undefined;
  formState.time = undefined;
  formState.title = "";
  formState.description = "";
  emits("handleCloseModal");
}

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { time, title, description, userType } = event.data;
  const sopTime = time as Array<{
    hours: number;
    minutes: number;
    seconds: number;
  }>;
  const formatedTime = changeFormValueToValidPayload(sopTime || []);
  const payload: SOPFormPayloadType & { id?: number; roleName: string } = {
    id: props?.defaultFormValue?.id,
    time: formatedTime,
    title,
    description: description || "",
    roleId: (userType as any)?.value,
    roleName: (userType as any)?.label,
  };
  emits("handleSuccessAddData", payload);
}
</script>

<template>
  <UForm class="space-y-4" :schema="Schema" :state="formState" @submit="onSubmit">
    <UCard :ui="{ ...UI_CARD_STYLES }">
      <template #header>
        <div class="w-full flex justify-between items-center pb-6 mb-6 border-b">
          <h2 class="text-[--app-dark-100] text-2xl font-semibold leading-[30px]">
            {{ !!defaultFormValue ? "Ubah" : "Tambah" }} SOP
          </h2>
          <UButton
            @click="handleCloseModal"
            type="button"
            icon="i-heroicons-x-circle"
            class="bg-white text-[#292D32] [&>span]:w-6 [&>span]:h-6"
          />
        </div>
      </template>
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup name="userType" label="Diberikan ke" class="flex-1">
            <template #label>
              <FormLabel>Diberikan ke</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.userType"
              :options="ROLE_OPTIONS_FIELD"
              placeholder="Diberikan ke"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
          <UFormGroup label="Pukul Kegiatan" name="time" class="flex-1">
            <template #label>
              <FormLabel>Pukul Kegiatan</FormLabel>
            </template>
            <template #default="{ error }">
              <Timepicker
                v-model:model-value="formState.time"
                placeholder="Pilih waktu"
                :errorState="error"
              />
            </template>
            <template #error="{ error }">
              <span :class="[error ? 'text-red-500' : '']">
                {{ error }}
              </span>
            </template>
          </UFormGroup>
        </div>
        <UFormGroup name="title" label="Judul Kegiatan">
          <template #label>
            <FormLabel>Judul Kegiatan</FormLabel>
          </template>
          <UInput variant="outline" placeholder="Tulis Judul Kegiatan" v-model="formState.title" />
        </UFormGroup>
        <UFormGroup name="description" label="Deskripsi Kegiatan (opsional)">
          <template #label>
            <FormLabel>Deskripsi Kegiatan (opsional)</FormLabel>
          </template>
          <UTextarea
            variant="outline"
            placeholder="Tulis Deskripsi Kegiatan"
            v-model="(formState.description as string)"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex justify-end items-center space-x-[18px]">
          <UButton
            @click="handleCloseModal"
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
            :disabled="isLoading"
            size="md"
            :ui="{ ...UI_PRIMARY_BUTTON_STYLES }"
          >
            {{ isLoading ? "Menyimpan..." : !!defaultFormValue ? "Ubah" : "Tambah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

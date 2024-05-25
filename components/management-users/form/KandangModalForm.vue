<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import type { KandangPayload, KandangType } from "~/types/kandang";

const emits = defineEmits<{
  (e: "handleSuccessAddKandang", item: KandangPayload): void;
  (e: "handleCloseModal"): void;
}>();
const props = defineProps<{
  initialValue?: KandangType;
  isLoading?: boolean;
}>();

const Schema = object({
  name: string().required("Nama Kandang tidak boleh kosong."),
  nik: string().required("ID Kandang tidak boleh kosong."),
  address: string().required("Alamat Kandang tidak boleh kosong."),
});

type FormValuesType = InferType<typeof Schema>;

const formState = reactive<FormValuesType>({
  nik: "",
  name: "",
  address: "",
});

onMounted(() => {
  if (!!props.initialValue) {
    formState.name = props?.initialValue?.name;
    formState.nik = props?.initialValue?.nik;
    formState.address = props?.initialValue?.address;
  }
});

const handleCloseModal = () => {
  formState.nik = "";
  formState.name = "";
  formState.address = "";
  emits("handleCloseModal");
};

async function onSubmit(event: FormSubmitEvent<FormValuesType>) {
  const { data } = event;
  emits("handleSuccessAddKandang", {
    name: data?.name,
    address: data?.address,
    code: data?.nik,
  });
}
</script>

<template>
  <UForm
    class="space-y-4"
    :schema="Schema"
    :state="formState"
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
            {{ !!initialValue ? "Update" : "Tambah" }} Kandang
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
        <UFormGroup name="name" label="Nama Kandang">
          <template #label>
            <FormLabel>Nama Kandang</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="Nama Kandang"
            v-model="formState.name"
          />
        </UFormGroup>
        <UFormGroup name="nik" label="ID Kandang">
          <template #label>
            <FormLabel>ID Kandang</FormLabel>
          </template>
          <UInput
            variant="outline"
            placeholder="ID Kandang"
            v-model="formState.nik"
          />
        </UFormGroup>
        <UFormGroup name="address" label="Alamat Kandang">
          <template #label>
            <FormLabel>Alamat Kandang</FormLabel>
          </template>
          <UTextarea
            variant="outline"
            placeholder="Alamat Kandang"
            v-model="formState.address"
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
            :disabled="isLoading"
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
            {{ isLoading ? "Tunggu..." : !!initialValue ? "Update" : "Tambah" }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<script setup lang="ts">
import { mixed, object, type InferType, string, array } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { ROLES_OPTIONS_FORM } from "~/constants/role";
import { ASYNC_KEY } from "~/constants/api";

const emits = defineEmits(["handleCloseModal", "handleSuccessAddUser"]);

const Schema = object({
  name: string().required("Nama tidak boleh kosong."),
  id: string().required("ID User tidak boleh kosong."),
  phoneNumber: string().optional(),
  role: mixed().test("Required", "Role tidak boleh kosong.", (value: any) => {
    return value?.value !== undefined;
  }),
  cage: array().of(string()).min(1, "Kandang penempatan tidak boleh kosong."),
});
type FormValueType = InferType<typeof Schema>;

const { getAllKandang } = useKandang();
const formState = reactive<FormValueType>({
  name: "",
  id: "",
  phoneNumber: "",
  role: undefined,
  cage: [],
});

const { data, pending } = await useAsyncData(
  ASYNC_KEY.kandang,
  async () => getAllKandang(),
  {
    lazy: true,
  }
);

const handleCloseModal = () => {
  formState.name = "";
  formState.id = "";
  formState.phoneNumber = "";
  formState.role = undefined;
  formState.cage = [];
  emits("handleCloseModal");
};

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  emits("handleSuccessAddUser", data);
  emits("handleCloseModal");
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
            Tambah Karyawan
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
          <UFormGroup name="name" label="Nama" class="flex-1">
            <template #label>
              <FormLabel>Nama</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="Nama"
              v-model="formState.name"
            />
          </UFormGroup>
          <UFormGroup name="id" label="ID User" class="flex-1">
            <template #label>
              <FormLabel>ID User</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="ID User"
              v-model="formState.id"
            />
          </UFormGroup>
        </div>
        <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
          <UFormGroup
            name="phoneNumber"
            label="No. Handphone (opsional)"
            class="flex-1"
          >
            <template #label>
              <FormLabel>No. Handphone (opsional)</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="No. Handphone (opsional)"
              v-model="formState.phoneNumber"
            />
          </UFormGroup>
          <UFormGroup label="Role" name="role" class="flex-1">
            <template #label>
              <FormLabel>Role</FormLabel>
            </template>
            <UInputMenu
              size="md"
              :nullable="true"
              v-model="formState.role"
              :options="ROLES_OPTIONS_FORM"
              placeholder="Pilih Role"
              :input-class="'input-select-trigger'"
            />
          </UFormGroup>
        </div>
        <UFormGroup name="cage" label="Ditempatkan di">
          <template #label>
            <FormLabel>Ditempatkan di</FormLabel>
          </template>
          <template #default="{ error }">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <template v-if="!!data?.length">
                <UCheckbox
                  v-for="kandang in data"
                  v-model="formState.cage"
                  :value="kandang.id"
                  :label="kandang.name"
                  :id="String(kandang.id)"
                  :name="String(kandang.id)"
                />
              </template>
            </div>
          </template>
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

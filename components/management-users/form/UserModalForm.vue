<script setup lang="ts">
import { mixed, object, type InferType, string, array } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { ROLES_OPTIONS_FORM } from "~/constants/role";
import { ASYNC_KEY } from "~/constants/api";

const emits = defineEmits(["handleCloseModal", "handleSuccessAddUser"]);

const Schema = object({
  name: string().required("Nama tidak boleh kosong."),
  password: string().required("Password tidak boleh kosong."),
  phoneNumber: string().optional(),
  role: mixed().test("Required", "Role tidak boleh kosong.", (value: any) => {
    return value?.value !== undefined;
  }),
  coop: array().of(string()).min(1, "Kandang penempatan tidak boleh kosong."),
  email: string()
    .email("Email tidka valid.")
    .required("Email tidak boleh kosong."),
});
type FormValueType = InferType<typeof Schema>;

const { getAllKandang } = useKandang();
const { type, handleChangeVisibility, iconClassName } =
  usePasswordInputVisibility();
const formState = reactive<FormValueType>({
  name: "",
  password: "",
  phoneNumber: "",
  role: undefined,
  coop: [],
  email: "",
});
const previewAvatar = ref("/images/no_photo.png");

const { data, pending } = await useAsyncData(
  ASYNC_KEY.kandang,
  async () => getAllKandang(),
  {
    lazy: true,
  }
);

const handleCloseModal = () => {
  formState.name = "";
  formState.password = "";
  formState.phoneNumber = "";
  formState.role = undefined;
  formState.coop = [];
  formState.email = "";
  emits("handleCloseModal");
};

async function onSubmit(event: FormSubmitEvent<FormValueType>) {
  const { data } = event;
  console.log(data);
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
        <div
          class="w-[80px] h-[80px] border border-[--app-primary-100] rounded-full relative"
        >
          <img
            :src="previewAvatar"
            width="80"
            height="80"
            class="w-full h-full object-contain"
          />
          <label
            for="avatar"
            class="absolute w-8 h-8 bg-[--app-primary-100] border-2 border-gray-400 rounded-full inline-flex items-center justify-center cursor-pointer bottom-0 -right-1"
            ><svg
              style="margin-top: -3px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#fff"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>

            <input type="file" class="hidden" id="avatar" />
          </label>
        </div>
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
          <UFormGroup name="email" label="Email" class="flex-1">
            <template #label>
              <FormLabel>Email User</FormLabel>
            </template>
            <UInput
              variant="outline"
              placeholder="ID User"
              v-model="formState.email"
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
          <UFormGroup label="Password" name="password" class="flex-1">
            <UInput
              :ui="{ icon: { trailing: { pointer: '' } } }"
              v-model="formState.password"
              :type="type"
              placeholder="Masukan password"
            >
              <template #trailing>
                <UButton
                  type="button"
                  color="gray"
                  variant="link"
                  :icon="iconClassName"
                  :padded="false"
                  size="sm"
                  @click="handleChangeVisibility"
                />
              </template>
            </UInput>
          </UFormGroup>
        </div>
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
        <UFormGroup name="cage" label="Ditempatkan di">
          <template #label>
            <FormLabel>Ditempatkan di</FormLabel>
          </template>
          <template #default="{ error }">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <template v-if="!!data?.length">
                <UCheckbox
                  v-for="kandang in data"
                  v-model="formState.coop"
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

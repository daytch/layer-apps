<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { ROLES_OPTIONS_FORM } from "~/constants/role";
import { ASYNC_KEY } from "~/constants/api";
import {
  UI_CARD_STYLES,
  UI_GHOST_BUTTON_STYLES,
  UI_PRIMARY_BUTTON_STYLES,
} from "~/constants/ui";
import { UserFormSchema, type UserFormValueType } from "~/schemas/user";

const emits = defineEmits(["handleCloseModal", "handleSuccessAddUser"]);

const { getAllKandang } = useKandang();
const { type, handleChangeVisibility, iconClassName } =
  usePasswordInputVisibility();
const formState = reactive<UserFormValueType>({
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

const showCoopField = computed(
  () =>
    !!(formState?.role as any)?.label &&
    !(formState?.role as any)?.label?.toLowerCase()?.includes("admin")
);
const isCoopMultiple = computed(
  () => (formState.role as any)?.label === "Mandor"
);

watch(
  () => formState.role,
  (role: any) => {
    if (role?.label === "Anak Kandang") {
      formState.coop = {};
    } else {
      formState.coop = [];
    }
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

async function onSubmit(event: FormSubmitEvent<UserFormValueType>) {
  const { data } = event;
  console.log(data);
}
</script>

<template>
  <UForm
    class="space-y-4"
    :schema="UserFormSchema"
    :state="formState"
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
          >
            <IconPhoto class="size-5" style="margin-top: -3px" />
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
              placeholder="Email User"
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
        <UFormGroup name="coop" label="Ditempatkan di" v-if="showCoopField">
          <template #label>
            <FormLabel>Ditempatkan di</FormLabel>
          </template>
          <USelectMenu
            size="md"
            v-model="formState.coop"
            :options="data || []"
            placeholder="Pilih Kandang"
            option-attribute="name"
            by="id"
            :disabled="!formState.role"
            :multiple="isCoopMultiple"
          >
            <template #label>
              <span
                v-if="isCoopMultiple && !!(formState?.coop as Array<any>)?.length"
                class="truncate text-[--app-dark-200]"
                >{{ (formState?.coop as any)?.length }} dipilih</span
              >
              <span
                v-else-if="!isCoopMultiple && !!(formState?.coop as any)?.name"
                class="truncate text-[--app-dark-200]"
                >{{ (formState?.coop as any)?.name }}</span
              >
              <span v-else class="text-[--app-primary-text]"
                >Pilih Kandang</span
              >
            </template>
          </USelectMenu>
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

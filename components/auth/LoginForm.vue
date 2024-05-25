<script setup lang="ts">
import { object, string, type InferType } from "yup";
import { TOAST_ERROR_UI } from "~/constants/ui";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  employeId: string().required("ID Karyawan wajib diisi."),
  password: string().required("Password wajib diisi."),
});
const { type, handleChangeVisibility, iconClassName } =
  usePasswordInputVisibility();
const { login } = useAuth();
const toast = useToast();

type Schema = InferType<typeof schema>;

const state = reactive({
  employeId: "",
  password: "",
});

const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    await login({
      username: event.data.employeId,
      password: event.data.password,
    });
    loading.value = false;
    await navigateTo("/");
  } catch (error: any) {
    toast.add({
      title: error?.data?.message || "",
      ui: { ...TOAST_ERROR_UI },
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NuxtImg
    format="webp"
    src="/images/layer_apps_potrait.svg"
    alt="Layer Apps Logo"
    width="105"
    height="141"
    class="md:hidden mb-7 block mx-auto"
  />
  <div class="w-full px-7 pb-7 md:px-0 md:pb-0">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-[22px]"
      @submit="onSubmit"
    >
      <UFormGroup label="ID Karyawan" name="employeId">
        <UInput v-model="state.employeId" placeholder="Masukan ID Karyawan" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          :ui="{ icon: { trailing: { pointer: '' } } }"
          v-model="state.password"
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

      <UButton
        type="submit"
        :block="true"
        :disabled="loading"
        :ui="{
          strategy: 'override',
          base: '',
          padding: {
            md: 'py-[10px] px-4',
          },
          color: {
            primary: {
              solid:
                'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
            },
          },
        }"
        >{{ loading ? "Tunggu..." : "Masuk" }}</UButton
      >
    </UForm>

    <div class="flex items-start mt-[50px] relative z-10">
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="text-[--app-dark-600] mt-0.5"
      />
      <div class="flex-1 ml-1">
        <p class="text-[--app-dark-600] text-sm">
          Tanyakan ke admin apabila lupa nama atau password.
        </p>
      </div>
    </div>
  </div>
</template>

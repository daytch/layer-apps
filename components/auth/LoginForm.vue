<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  employeId: z.string().min(1, "ID Karyawan wajib diisi."),
  password: z.string().min(1, "Password wajib diisi."),
});
const { type, handleChangeVisibility, iconClassName } =
  usePasswordInputVisibility();

type Schema = z.output<typeof schema>;

const state = reactive({
  employeId: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
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

      <UButton type="submit" :block="true">Masuk</UButton>
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

<script lang="ts" setup>
import { ref } from "vue";

const type = ref("password");

defineEmits(["update:modelValue"]);

defineProps<{
  modelValue: string | undefined;
}>();

const switchVisibility = () => {
  type.value = type.value === "password" ? "text" : "password";
};
</script>

<template>
  <UInput
    :ui="{ icon: { trailing: { pointer: '' } } }"
    :modelValue="modelValue"
    :type="type"
  >
    <template #trailing>
      <UButton
        color="gray"
        variant="link"
        :padded="false"
        :icon="type === 'password' ? 'i-ph-eye-fill' : 'i-ph-eye-slash-fill'"
        @click="switchVisibility"
      />
    </template>
  </UInput>
</template>

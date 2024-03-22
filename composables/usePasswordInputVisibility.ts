export const usePasswordInputVisibility = () => {
  const type = ref<"password" | "text">("password");

  const handleChangeVisibility = () => {
    type.value = type.value === "password" ? "text" : "password";
  };

  const iconClassName = computed(() =>
    type.value === "password" ? "i-heroicons-eye" : "i-heroicons-eye-slash"
  );

  return { type, handleChangeVisibility, iconClassName };
};

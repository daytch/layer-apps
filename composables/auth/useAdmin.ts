export const useAdmin = () => {
  const authUser = useAuthUser();

  return computed(() => {
    if (!authUser?.value) return false;
    return authUser.value?.role_name?.toLowerCase().includes("admin");
  });
};

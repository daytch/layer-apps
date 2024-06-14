export const useQueryParams = () => {
  const router = useRouter();
  const route = useRoute();

  const queryParams = computed(() => route.query);

  const handleChangeQueryParams = (key: string, value: any) => {
    router.push({ query: { ...queryParams.value, [key]: value } });
  };

  return { handleChangeQueryParams, queryParams };
};

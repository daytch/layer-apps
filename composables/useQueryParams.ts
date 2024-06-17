export const useQueryParams = () => {
  const router = useRouter();
  const route = useRoute();

  const queryParams = computed(() => route.query);

  const handleChangeQueryParams = (key: string, value: any) => {
    router.push({ query: { ...queryParams.value, [key]: value } });
  };

  const handleNewQueryParams = (newQuery: Record<string, string | number | undefined>) => {
    router.push({ query: { ...route.query, ...newQuery } });
  };

  return { handleChangeQueryParams, queryParams, handleNewQueryParams };
};

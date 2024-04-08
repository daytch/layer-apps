type TabItem = {
  label: string;
  content: string;
};

export const useAdminSOP = (items: Array<TabItem>) => {
  const route = useRoute();
  const router = useRouter();

  const selectedTab = computed({
    get() {
      const index = items.findIndex((item) => item.label === route.query.tab);
      if (index === -1) {
        return 0;
      }
      return index;
    },
    set(value) {
      router.replace({ query: { tab: items[value].label } });
    },
  });

  const handleChangeTab = (value: string) => {
    router.replace({ query: { tab: value } });
  };

  return { selectedTab, handleChangeTab };
};

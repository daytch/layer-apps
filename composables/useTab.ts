type Tab = {
  label: string;
  key: string;
};

export const useTab = (tabs: Tab[]) => {
  const route = useRoute();
  const router = useRouter();

  const selectedTab = computed({
    get() {
      const index = tabs.findIndex((item) => item.key === route.query.tab);
      if (index === -1) {
        return 0;
      }
      return index;
    },
    set(value) {
      router.replace({ query: { tab: tabs[value].key } });
    },
  });

  const handleChangeTab = (value: string) => {
    router.replace({ query: { tab: value } });
  };

  return { selectedTab, handleChangeTab };
};

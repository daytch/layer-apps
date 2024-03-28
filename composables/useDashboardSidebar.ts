import { createSharedComposable } from "@vueuse/core";

const _useDashboardSidebar = () => {
  const route = useRoute();
  const isSidebarSliderOpen = ref(false);
  const isNotificationSliderOpen = ref(false);
  const isSidebarExpanded = ref(true);

  watch(
    () => route.fullPath,
    () => {
      isSidebarSliderOpen.value = false;
      isNotificationSliderOpen.value = false;
    }
  );

  return {
    isSidebarSliderOpen,
    isNotificationSliderOpen,
    isSidebarExpanded,
  };
};

export const useDashboardSidebar = createSharedComposable(_useDashboardSidebar);

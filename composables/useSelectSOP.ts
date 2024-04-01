import { createSharedComposable } from "@vueuse/core";
import type { SOPItem } from "~/types/sop";

export const _useSelectSOP = () => {
  const selectedItem = ref<SOPItem | null>(null);
  const showModal = ref<boolean>(false);

  const handleSelectSOPItem = (item: SOPItem) => {
    selectedItem.value = item;
    showModal.value = true;
  };
  const handleDeselectSOPItem = () => {
    selectedItem.value = null;
    showModal.value = false;
  };

  return {
    showModal,
    handleDeselectSOPItem,
    handleSelectSOPItem,
    selectedItem,
  };
};

export const useSelectSOP = createSharedComposable(_useSelectSOP);

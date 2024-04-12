import type { UnwrapRef } from "vue";

export const useModalForm = <T>() => {
  const showModal = ref(false);
  const selectedItem = ref<T | undefined>(undefined);

  const handleShowModal = (item: UnwrapRef<T> | undefined) => {
    selectedItem.value = item;
    showModal.value = true;
  };

  const handleCloseModal = () => {
    (selectedItem.value = undefined), (showModal.value = false);
  };

  return { showModal, handleCloseModal, handleShowModal, selectedItem };
};

const _useFoodMedicineStockForm = () => {
  const showFormModal = ref(false);

  const formState = reactive({
    cageName: undefined,
    itemName: undefined,
    itemID: undefined,
    quantity: undefined,
    price: undefined,
  });

  watch(showFormModal, () => {
    if (!showFormModal.value) {
      formState.cageName = undefined;
      formState.itemName = undefined;
      formState.itemID = undefined;
      formState.quantity = undefined;
      formState.price = undefined;
    }
  });

  return { showFormModal, formState };
};

export const useFoodMedicineStockForm = createSharedComposable(
  _useFoodMedicineStockForm
);

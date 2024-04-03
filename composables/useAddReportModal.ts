const _useAddReportModal = () => {
  const showFormModal = ref(false);

  const formState = reactive({
    cageName: undefined,
    date: undefined,
    disease: undefined,
  });

  watch(showFormModal, () => {
    if (!showFormModal.value) {
      formState.cageName = undefined;
      formState.date = undefined;
      formState.disease = undefined;
    }
  });

  return { showFormModal, formState };
};

export const useAddReportModal = createSharedComposable(_useAddReportModal);

const _useHandleReportModal = () => {
  const showFormModal = ref(false);

  const formState = reactive({
    medicine: undefined,
    dosis: undefined,
    progress: undefined,
  });

  watch(showFormModal, () => {
    if (!showFormModal.value) {
      formState.medicine = undefined;
      formState.dosis = undefined;
      formState.progress = undefined;
    }
  });

  return { showFormModal, formState };
};

export const useHandleReportModal = createSharedComposable(
  _useHandleReportModal
);

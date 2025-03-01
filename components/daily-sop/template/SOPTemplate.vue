<script setup lang="ts">
import type { SOPByUserDataType } from "~/types/sop";

defineProps<{ sopItems: Array<SOPByUserDataType>; isLoading?: boolean }>();

const { completeSOPById, isLoading: isLoadingUpdate } = useFetchSOP();
const authUser = useAuthUser();
const { showModal, handleCloseModal, handleShowModal, selectedItem } =
  useModalForm<SOPByUserDataType>();
const { handleShowToast } = useShowToast();

const handleConfim = async (payload: {
  coopId: number;
  feedId?: number;
  qty?: number;
}) => {
  if (
    !selectedItem.value?.description?.length ||
    !authUser?.value?.user ||
    !payload?.coopId
  )
    return;
  let newPayload = {
    ...payload,
    sopId: selectedItem.value.id,
    userId: authUser?.value?.user?.id,
  };
  Object.keys(newPayload).forEach((key) => {
    if (!newPayload[key as keyof typeof newPayload]) {
      delete newPayload[key as keyof typeof newPayload];
    }
  });
  completeSOPById(newPayload).then((data) => {
    if (data?.statusCode === 201) {
      handleCloseModal();
    } else {
      handleShowToast({
        type: "ERROR",
        message: "Gagal menyelesaikan SOP. Coba lagi.",
      });
    }
  });
};
</script>

<template>
  <UModal
    v-model="showModal"
    :ui="{
      strategy: 'override',
      container: 'flex min-h-full items-center justify-center text-center',
      width: 'w-full max-w-[343px] md:max-w-[500px]',
    }"
  >
    <SOPConfirmModal
      @handle-confirm="handleConfim"
      :selected-s-o-p-item="selectedItem"
      @handle-close-modal="handleCloseModal"
      :is-loading="isLoadingUpdate"
    />
  </UModal>

  <div
    class="p-6 bg-white border rounded-[14px] border-[--app-dark-800]"
    v-if="isLoading"
  >
    <LoadingSpinner />
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]"
    v-else-if="!isLoading && !!sopItems.length"
  >
    <template v-for="sopItem in sopItems">
      <SOPCard
        :role="(authUser?.user?.role_name as any) || 'Mandor'"
        :sop-item="sopItem"
        @handle-select-item="(sopItem) => handleShowModal(sopItem)"
      />
    </template>
  </div>
  <div
    v-else
    class="p-6 bg-white border rounded-[14px] border-[--app-dark-800]"
  >
    <NoDataStatus>Data tidak ditemukan.</NoDataStatus>
  </div>
</template>

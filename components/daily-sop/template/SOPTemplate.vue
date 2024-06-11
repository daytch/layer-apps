<script setup lang="ts">
import type { SOPDataType } from "~/types/sop";

defineProps<{ sopItems: Array<SOPDataType> }>();

const { completeSOPById, isLoading } = useFetchSOP();
const authUser = useAuthUser();
const { showModal, handleCloseModal, handleShowModal, selectedItem } =
  useModalForm<SOPDataType>();

const handleConfim = async () => {
  if (!selectedItem.value?.description?.length || !authUser?.value?.user)
    return;
  completeSOPById({
    sopId: selectedItem.value.id,
    userId: authUser?.value?.user?.id,
  }).then((data: any) => {
    console.log(data);
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
      :is-loading="isLoading"
    />
  </UModal>
  <DashboardContainer>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
      <template v-for="sopItem in sopItems">
        <SOPCard
          :role="(authUser?.user?.role_name as any) || 'Mandor'"
          :sop-item="sopItem"
          @handle-select-item="(sopItem) => handleShowModal(sopItem)"
        />
      </template>
    </div>
  </DashboardContainer>
</template>

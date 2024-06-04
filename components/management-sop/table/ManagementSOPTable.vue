<script setup lang="ts">
import { ROLES } from "~/constants/role";
import type { SOPDataType } from "~/types/sop";

defineProps<{
  sopItems?: Array<SOPDataType>;
  pending?: boolean;
}>();
defineEmits<{ (e: "handleSelectItem", sopItem: SOPDataType): void }>();

const { deleteSOPById, isLoading } = useFetchSOP();

const selectedSOPItem = ref<SOPDataType | undefined>(undefined);
const showDeleteSOPMOdal = ref(false);

const handleDeleteItem = () => {
  if (!selectedSOPItem?.value?.id) return;
  deleteSOPById(selectedSOPItem.value).then(() => {
    showDeleteSOPMOdal.value = false;
    selectedSOPItem.value = undefined;
  });
};
</script>

<template>
  <div class="w-full overflow-auto mt-6 bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="text-left py-[18px] px-4 text-[--app-dark-900] text-base font-medium leading-6"
          >
            SOP
          </th>
          <th
            class="text-left py-[18px] px-4 text-[--app-dark-900] text-base font-medium leading-6"
          >
            Diberikan ke
          </th>
          <th
            class="text-left py-[18px] px-4 text-[--app-dark-900] text-base font-medium leading-6"
          >
            Pukul
          </th>
          <th
            class="text-left py-[18px] px-4 text-[--app-dark-900] text-base font-medium leading-6"
          ></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="pending">
          <tr class="border-b border-b-[--app-gray-500]">
            <td
              :colspan="4"
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              <LoadingSpinner />
            </td>
          </tr>
        </template>
        <template v-else-if="!pending && !!sopItems?.length">
          <tr
            v-for="item in sopItems"
            class="border-b border-b-[--app-gray-500]"
          >
            <td
              class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              {{ item?.title }}
            </td>
            <td
              class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              {{ ROLES.find((role) => role?.id === item?.roleId)?.name }}
            </td>
            <td
              class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              {{ item.time }}
            </td>
            <td
              class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
            >
              <div class="flex items-center space-x-5">
                <button type="button" @click="$emit('handleSelectItem', item)">
                  <IconPenUpdate />
                </button>
                <button
                  type="button"
                  @click="
                    () => {
                      selectedSOPItem = item;
                      showDeleteSOPMOdal = true;
                    }
                  "
                >
                  <IconTrash />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="4">
              <NoDataStatus>Data SOP Tidak Ditemukan</NoDataStatus>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    v-model="showDeleteSOPMOdal"
    :title="'Hapus SOP?'"
    :is-loading="isLoading"
    @handle-confirm-delete="handleDeleteItem"
  >
    <template #description>
      <p class="delete-confirm-description">
        Hapus item ID: {{ selectedSOPItem?.id }}
      </p>
    </template>
  </DeleteConfirmModal>
</template>

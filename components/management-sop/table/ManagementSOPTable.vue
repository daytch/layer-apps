<script setup lang="ts">
import type { ManagementSOP } from "~/types/sop";

defineProps<{
  items: Array<ManagementSOP>;
  activeTab: string;
}>();

const selectedSOPItem = ref<ManagementSOP | undefined>(undefined);
const showDeleteSOPMOdal = ref(false);
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
        <tr v-for="item in items" class="border-b border-b-[--app-gray-500]">
          <td
            class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
          >
            {{ item.sop }}
          </td>
          <td
            class="text-left py-[18px] px-4 text-sm font-normal leading-[22px] text-[--app-dark-100]"
          >
            {{ activeTab }}
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
              <button type="button">
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
      </tbody>
    </table>
  </div>
  <DeleteConfirmModal
    v-model="showDeleteSOPMOdal"
    :title="'Hapus SOP?'"
    @handle-confirm-delete="
      () => {
        console.log('delete item');
      }
    "
  >
    <template #description>
      <p class="delete-confirm-description">
        Hapus item ID: {{ selectedSOPItem?.id }}
      </p>
    </template>
  </DeleteConfirmModal>
</template>

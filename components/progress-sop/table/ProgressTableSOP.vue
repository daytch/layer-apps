<script setup lang="ts">
import type { SOPDataType, SOPProgressDataType } from "~/types/sop";

type FormatedProgressData = {
  sopData: Array<SOPDataType>;
  progressData: Array<SOPProgressDataType>;
};
defineProps<{ items: FormatedProgressData; isLoading?: boolean }>();
</script>

<template>
  <div class="w-full overflow-auto mt-6">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="py-[18px] px-4 text-base leading-6 font-medium text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            Nama
          </th>
          <th
            v-for="item in items.sopData"
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <UTooltip
              :text="item?.title"
              :popper="{ arrow: true }"
              :ui="{
                strategy: 'override',
                base: '[@media(pointer:coarse)]:hidden h-auto px-2 py-1 text-sm font-normal relative',
              }"
            >
              <template #text>
                <span class="italic">{{ item?.title }}</span>
              </template>
              <div class="line-clamp-2">
                {{ item?.title }}
              </div>
            </UTooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading" class="border-b border-b-[--app-gray-500]">
          <td :colspan="items?.sopData?.length + 1">
            <LoadingSpinner />
          </td>
        </tr>
        <template v-else-if="!!items?.progressData?.length">
          <tr
            class="border-b border-b-[--app-gray-500]"
            v-for="item in items?.progressData"
          >
            <td class="text-left whitespace-nowrap p-4 bg-white uppercase">
              {{ item?.name || "" }}
            </td>
            <td
              class="p-4 bg-white text-center"
              v-for="sopItem in items?.sopData"
            >
              <UIcon
                v-if="item.detail[sopItem.id.toString()]"
                name="i-heroicons-check-circle"
                class="w-6 h-6 text-[#3758F9]"
              />
              <UIcon
                v-else
                name="i-heroicons-x-circle"
                class="w-6 h-6 text-[--app-danger-300]"
              />
            </td>
          </tr>
        </template>
        <tr
          v-else-if="!isLoading && !items?.progressData?.length"
          class="border-b border-b-[--app-gray-500]"
        >
          <td :colspan="items?.sopData?.length + 1">
            <NoDataStatus>Data Progress Tidak Ditemukan</NoDataStatus>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

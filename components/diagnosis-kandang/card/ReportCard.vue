<script setup lang="ts">
import { UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";
import { type DiagnosisKandangType } from "~/types/report";

defineProps<{ report: DiagnosisKandangType }>();

defineEmits<{
  (e: "handleShowHandleReport", report: DiagnosisKandangType): void;
}>();
</script>

<template>
  <div
    class="w-full pr-2 py-2 border-b border-[--app-gray-500]"
    :class="!!report?.progres?.length ? 'bg-white' : 'bg-[--app-danger-600]'"
  >
    <table>
      <tbody>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            ID Kandang
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ report?.coop_id || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Tanggal
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ formatDate(report.trans_date, "dd MMM yyyy") }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Pelapor
          </th>
          <td
            class="py-2 px-6 text-left text-sm font-normal text-[#1D2433] uppercase"
          >
            {{ report?.reporter || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Riwayat Penyakit
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ report?.disease || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Obat yg diberikan
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ report?.medicine || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Progress
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            <button
              v-if="
                !report?.progres?.length ||
                report?.progres?.toLowerCase().includes('belum')
              "
              class="py-1 px-2 text-sm font-normal leading-[22px] text-center inline-flex items-center justify-center text-white rounded-md bg-[--app-primary-100] ring-1 ring-[--app-primary-100]"
              type="button"
              @click="$emit('handleShowHandleReport', report)"
            >
              Tangani
            </button>
            <span v-else>{{ report?.progres }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <HandleReportModal />
</template>

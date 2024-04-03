<script setup lang="ts">
import { type DiagnosisKandang } from "~/types/report";

defineProps<{ report: DiagnosisKandang }>();

const { showFormModal } = useHandleReportModal();
</script>

<template>
  <div class="w-full pr-2 py-2">
    <table>
      <tbody>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            ID Kandang
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ report?.cageID || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Tanggal
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ formatDate(report.date, "dd MMM yyyy") }}
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
            {{ report?.diseaseHistory || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Obat yg diberikan
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            {{ report?.medicationAdministered || "" }}
          </td>
        </tr>
        <tr class="py-[2px]">
          <th class="text-left py-2 px-6 text-sm font-normal text-[#1D2433]">
            Progress
          </th>
          <td class="py-2 px-6 text-left text-sm font-normal text-[#1D2433]">
            <span v-if="report?.progress === 'HANDLED'">Sudah Lapor PPL</span>
            <UButton
              v-else
              type="button"
              @click="showFormModal = true"
              size="md"
              :ui="{
                strategy: 'override',
                padding: {
                  md: 'py-[4px] px-7',
                },
                color: {
                  primary: {
                    solid:
                      'bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed',
                  },
                },
              }"
            >
              Tambah
            </UButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <HandleReportModal />
</template>

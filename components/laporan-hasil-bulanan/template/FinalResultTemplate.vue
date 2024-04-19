<script setup lang="ts">
const data = [
  {
    id: "100000000921",
    period: "Juni 2023",
    name: "Kandang Jatisari",
    totalFee: 11862800,
  },
];
const COLUMNS = [
  {
    label: "ID Kandang",
    key: "id",
  },
  {
    label: "Periode",
    key: "period",
  },
  {
    label: "Kandang",
    key: "name",
  },
  {
    label: "Jumlah Akhir",
    key: "totalFee",
  },
  {
    label: "",
    key: "action",
  },
];
const selected = ref<any>(undefined);
const showModal = ref(false);
</script>

<template>
  <div class="mb-[14px]">
    <DateRangeFilter
      containerClass="bg-white rounded-lg"
      :show-add-button="true"
      :add-button-text="'Tambah Laporan'"
    >
      <template #additional>
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Masukkan ID Pelanggan"
          :ui="{
            padding: {
              md: 'py-3',
            },
            size: {
              md: 'text-base',
            },
          }"
        />
      </template>
    </DateRangeFilter>
  </div>
  <MonthlyReportBaseTable :header-columns="COLUMNS">
    <template #content>
      <tr v-for="item in [...data, ...data, ...data, ...data]">
        <td>{{ item.id }}</td>
        <td>{{ item.period }}</td>
        <td>{{ item.name }}</td>
        <td>{{ formatMoney(item.totalFee) }}</td>
        <td>
          <div class="flex items-center space-x-5">
            <NuxtLink href="/dashboard/laporan-hasil-bulanan/detail/1">
              <Icon
                name="i-heroicons-eye"
                class="w-6 h-6 [&>g]:stroke-[#292D32]"
              />
            </NuxtLink>
            <button
              type="button"
              @click="
                () => {
                  selected = item;
                  showModal = true;
                }
              "
            >
              <IconTrash />
            </button>
          </div>
        </td>
      </tr>
    </template>
  </MonthlyReportBaseTable>
  <DeleteConfirmModal
    v-model="showModal"
    @handle-confirm-delete=""
    :title="'Yakin'"
  >
    <template #description>
      <pre v-if="selected !== undefined">{{
        JSON.stringify(selected, null, 2)
      }}</pre>
    </template>
  </DeleteConfirmModal>
</template>

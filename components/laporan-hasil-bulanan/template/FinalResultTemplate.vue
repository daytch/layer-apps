<script setup lang="ts">
import { ASYNC_KEY, MONTHLY_REPORT_DETAIL_KEY } from "~/constants/api";
import type { MonthlyReportDataType } from "~/types/month-report";
const { getAllData } = useMonthlyReport();

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
const { queryParams } = useQueryParams();
// const router = useRouter();

const params = computed(() => {
  const obj = {} as Record<string, string>;
  if (!!queryParams.value["coopId"]?.length) {
    obj["coopId"] = queryParams.value["coopId"] as string;
  }
  if (!!queryParams.value["period"]?.length) {
    obj["period"] = queryParams.value["period"] as string;
  }
  return obj;
});

const { data, pending } = await useAsyncData(
  ASYNC_KEY.MONTHLY_REPORT,
  async () => getAllData(params.value),
  {
    lazy: true,
    watch: [params],
  }
);
// const selected = ref<any>(undefined);
// const showModal = ref(false);

const handleClickDetail = (selected: MonthlyReportDataType) => {
  if (!selected) return;
  const stringifyJSON = JSON.stringify(selected);
  localStorage.setItem(MONTHLY_REPORT_DETAIL_KEY, stringifyJSON);
};
</script>

<template>
  <MonthlyReportBaseTable :header-columns="COLUMNS">
    <template #content>
      <template v-if="pending">
        <tr>
          <td
            :colspan="COLUMNS.length"
            class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
          >
            <LoadingSpinner />
          </td>
        </tr>
      </template>
      <template v-else-if="!pending && !data?.length">
        <tr>
          <td :colspan="COLUMNS.length">
            <NoDataStatus>Data Tidak Ditemukan</NoDataStatus>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="item in data">
          <td>{{ item?.coopId }}</td>
          <td>{{ item?.name }}</td>
          <td>{{ item?.name }}</td>
          <td>{{ formatMoney(item?.netincome) }}</td>
          <td>
            <div class="flex items-center space-x-5">
              <NuxtLink
                @click="() => handleClickDetail(item)"
                :to="{
                  name: 'dashboard-laporan-hasil-bulanan-detail-id',
                  params: { id: item.id },
                }"
              >
                <Icon
                  name="i-heroicons-eye"
                  class="w-6 h-6 [&>g]:stroke-[#292D32]"
                />
              </NuxtLink>
              <!-- <button
                type="button"
                @click="
                  () => {
                    selected = item;
                    showModal = true;
                  }
                "
              >
                <IconTrash />
              </button> -->
            </div>
          </td>
        </tr>
      </template>
    </template>
  </MonthlyReportBaseTable>
  <!-- <DeleteConfirmModal
    v-model="showModal"
    @handle-confirm-delete=""
    :title="'Yakin'"
  >
    <template #description>
      <pre v-if="selected !== undefined">{{
        JSON.stringify(selected, null, 2)
      }}</pre>
    </template>
  </DeleteConfirmModal> -->
</template>

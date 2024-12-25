<script setup lang="ts">
import type { EggResponseDataType, UpdateRowFormType } from "~/types/egg";

defineProps<{
  eggData: Array<EggResponseDataType>;
  isLoadingData?: boolean;
}>();

const checkAll = defineModel<boolean>("checkAll");
const selectedItems = defineModel<Array<number>>("selectedItems");

const { checkVisibleColumn, isUpdateView } = useDataTable();
const { queryParams } = useQueryParams();
const queryCoopId = queryParams.value["coopId"];
const queryPeriod = queryParams.value["period"];

const showSelectCoopAndPeriodMessage = computed(
  () => !queryParams.value["coopId"] || !queryParams.value["period"]
);

const {
  handleShowModal: handleShowUpdateRowModal,
  handleCloseModal: handleCloseUpdateRowModal,
  showModal: isShowUpdateRowModal,
  selectedItem: selectedRow,
} = useModalForm<UpdateRowFormType>();

const showUpdateRowModal = (showModalParams: UpdateRowFormType) => {
  if (!isUpdateView.value) return;
  handleShowUpdateRowModal(showModalParams);
};
</script>

<template>
  <div class="w-full overflow-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th
            rowspan="3"
            v-if="isUpdateView"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            <UCheckbox v-model="checkAll" />
          </th>
          <th
            v-if="checkVisibleColumn('date')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Tanggal
          </th>
          <th
            v-if="checkVisibleColumn('age_day')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Umur (Hr)
          </th>
          <th
            v-if="checkVisibleColumn('age_week')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Umur (Mgg)
          </th>
          <th
            v-if="checkVisibleColumn('pop')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Pop
          </th>
          <th
            v-if="checkVisibleColumn('m')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            M
          </th>
          <th
            v-if="checkVisibleColumn('afk')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            AFK
          </th>
          <th
            v-if="checkVisibleColumn('sell')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Jual
          </th>
          <th
            v-if="checkVisibleColumn('last_pop')"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Pop Akhir
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#C2F3D6] border border-[--app-gray-500]"
            colspan="3"
          >
            Pakan
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
            colspan="8"
          >
            Produksi
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#FDD8D8] border border-[--app-gray-500]"
            rowspan="3"
          >
            HD
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#DCEEFF] border border-[--app-gray-500]"
            rowspan="3"
          >
            Egg Weight (Gr/Btr)
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            Egg Mass (Kg Telur/1000 Ekor)
          </th>
          <th
            width="124"
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            OVK
          </th>
        </tr>
        <tr>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#C2F3D6] border border-[--app-gray-500]"
            rowspan="2"
          >
            Jenis
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#C2F3D6] border border-[--app-gray-500]"
            rowspan="2"
          >
            KG
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#C2F3D6] border border-[--app-gray-500]"
            rowspan="2"
          >
            FIT (gr/ek)
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
            colspan="4"
          >
            Butir
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
            colspan="4"
          >
            KG
          </th>
        </tr>
        <tr>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            N
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            P
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            BS
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            Total Btr.
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            N
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            P
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            BS
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[#7DEEAB] border border-[--app-gray-500]"
          >
            Total Kg.
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoadingData">
          <tr class="border-b border-b-[--app-gray-500]">
            <td
              :colspan="23"
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              <LoadingSpinner />
            </td>
          </tr>
        </template>
        <template v-else-if="!isLoadingData && !!eggData.length">
          <tr v-for="item in eggData" class="bg-white even:bg-[#F8F9FC]">
            <td
              v-if="isUpdateView"
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              <UCheckbox :value="item.id" v-model="selectedItems" />
            </td>
            <td
              v-if="checkVisibleColumn('date')"
              @click="
                showUpdateRowModal({
                  type: 'date',
                  value: item.transDate,
                  id: item.id,
                  key: 'transDate',
                })
              "
              class="whitespace-nowrap p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{
                !!item?.transDate?.length && isValidDate(item?.transDate)
                  ? formatDate(item.transDate, "dd MMM yyyy")
                  : item.transDate
              }}
            </td>
            <td
              v-if="checkVisibleColumn('age_day')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item.ageInDay,
                  id: item.id,
                  key: 'ageInDay',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item.ageInDay }}
            </td>
            <td
              v-if="checkVisibleColumn('age_week')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item.ageInWeek,
                  id: item.id,
                  key: 'ageInWeek',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.ageInWeek }}
            </td>
            <td
              v-if="checkVisibleColumn('pop')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item.pop,
                  id: item.id,
                  key: 'pop',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.pop }}
            </td>
            <td
              v-if="checkVisibleColumn('m')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.m,
                  id: item.id,
                  key: 'm',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.m }}
            </td>
            <td
              v-if="checkVisibleColumn('afk')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.afk,
                  id: item.id,
                  key: 'afk',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.afk }}
            </td>
            <td
              v-if="checkVisibleColumn('sell')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.sell,
                  id: item.id,
                  key: 'sell',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.sell }}
            </td>
            <td
              v-if="checkVisibleColumn('last_pop')"
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.finalPop,
                  id: item.id,
                  key: 'finalPop',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.finalPop }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.feedType,
                  id: item.id,
                  key: 'feedType',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#C2F3D6]"
            >
              {{ item?.feedType }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item.pop,
                  id: item.id,
                  key: 'pop',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#C2F3D6]"
            >
              {{ item?.feedWeight }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item.feedFIT,
                  id: item.id,
                  key: 'feedFIT',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#C2F3D6]"
            >
              {{ item?.feedFIT }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodPieceN,
                  id: item.id,
                  key: 'prodPieceN',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodPieceN }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodPieceP,
                  id: item.id,
                  key: 'prodPieceP',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodPieceP }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodPieceBS,
                  id: item.id,
                  key: 'prodPieceBS',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodPieceBS }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodTotalPiece,
                  id: item.id,
                  key: 'prodTotalPiece',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodTotalPiece }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodWeightN,
                  id: item.id,
                  key: 'prodWeightN',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodWeightN }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodWeightP,
                  id: item.id,
                  key: 'prodWeightP',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodWeightP }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodWeightBS,
                  id: item.id,
                  key: 'prodWeightBS',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodWeightBS }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.prodTotalWeight,
                  id: item.id,
                  key: 'prodTotalWeight',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#7DEEAB]"
            >
              {{ item?.prodTotalWeight }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.HD,
                  id: item.id,
                  key: 'HD',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#FDD8D8]"
            >
              {{ item?.HD }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.FCR,
                  id: item.id,
                  key: 'FCR',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900] bg-[#DCEEFF]"
            >
              {{ item?.FCR }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.EggWeight,
                  id: item.id,
                  key: 'EggWeight',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.EggWeight }}
            </td>
            <td
              @click="
                showUpdateRowModal({
                  type: 'number',
                  value: item?.OVK,
                  id: item.id,
                  key: 'OVK',
                })
              "
              class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
            >
              {{ item?.OVK }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="border-b border-b-[--app-gray-500]">
            <td
              :colspan="23"
              class="p-4 text-[--app-dark-100] font-medium text-sm whitespace-nowrap text-center"
            >
              <template v-if="showSelectCoopAndPeriodMessage">
                <div
                  class="flex justify-center flex-col items-center space-y-8"
                >
                  <LogoGray />
                  <p class="text-sm text-center text-gray-900 max-w-[288px]">
                    Pilih Kandang & set Periode terlebih dahulu <br />Data akan
                    muncul disini
                  </p>
                </div>
              </template>
              <template v-else>
                <NoDataStatus>Data Telur tidak ditemukan.</NoDataStatus>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <AppModal v-model="isShowUpdateRowModal">
    <UpdateRowModal
      :default-value="(selectedRow || {} as UpdateRowFormType) "
      @handle-close-modal="handleCloseUpdateRowModal"
    />
  </AppModal>
</template>

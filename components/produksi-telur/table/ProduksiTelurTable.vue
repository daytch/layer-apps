<script setup lang="ts">
const { checkVisibleColumn, isUpdateView } = useDataTable();
const dummy = {
  date: "1 Jan 2024",
  age_week: 1,
  pop: 3800,
  m: "",
  afk: "",
  sell: "",
  last_pop: 3800,
  foodType: "",
  foodKG: "",
  foodFIT: 475,
  nItem: "",
  pItem: "",
  BSItem: 120,
  totalItem: 120,
  nKG: "",
  pKG: "",
  BSKG: 20.05,
  totalKG: 20.05,
  HD: "3.2%",
  FCR: 23.17,
  eggWeight: 170.83,
  eggMass: 5.39,
  ovk: "-",
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
            <UCheckbox />
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
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            colspan="3"
          >
            Pakan
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            colspan="8"
          >
            Produksi
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="3"
          >
            HD
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
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
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="2"
          >
            Jenis
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="2"
          >
            KG
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            rowspan="2"
          >
            FIT (gr/ek)
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            colspan="4"
          >
            Butir
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
            colspan="4"
          >
            KG
          </th>
        </tr>
        <tr>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            N
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            P
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            BS
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            Total Btr.
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            N
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            P
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            BS
          </th>
          <th
            class="text-center px-3 py-2 text-[--app-dark-900] text-sm font-medium leading-[22px] bg-[--app-gray-100] border border-[--app-gray-500]"
          >
            Total Kg.
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in Array(10).fill(dummy)"
          class="bg-white even:bg-[#F8F9FC]"
        >
          <td
            v-if="isUpdateView"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            <UCheckbox />
          </td>
          <td
            v-if="checkVisibleColumn('date')"
            class="whitespace-nowrap p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item.date }}
          </td>
          <td
            v-if="checkVisibleColumn('age_day')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ index + 1 }}
          </td>
          <td
            v-if="checkVisibleColumn('age_week')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.age_week }}
          </td>
          <td
            v-if="checkVisibleColumn('pop')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.pop }}
          </td>
          <td
            v-if="checkVisibleColumn('m')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.m }}
          </td>
          <td
            v-if="checkVisibleColumn('afk')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.afk }}
          </td>
          <td
            v-if="checkVisibleColumn('sell')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.sell }}
          </td>
          <td
            v-if="checkVisibleColumn('last_pop')"
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.last_pop }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.foodType }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.foodKG }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.foodFIT }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.nItem }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.pItem }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.BSItem }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.totalItem }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.nKG }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.pKG }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.BSKG }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.totalKG }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.HD }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.FCR }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.eggWeight }}
          </td>
          <td
            class="p-2 text-sm font-normal leading-[22px] text-[--app-dark-900]"
          >
            {{ item?.ovk }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  type HeaderGroup,
} from "@tanstack/vue-table";
import { ref } from "vue";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

function getMergeHeaderGroups<T>(tableHeaderGroups: HeaderGroup<T>[]) {
  const headerGroups = tableHeaderGroups;
  const headerIds = new Set(); // 동일한 컬럼명 중복 방지
  const resultHeaderGroups = [];

  if (headerGroups.length === 1) return [tableHeaderGroups[0].headers];

  for (let i = 0; i < headerGroups.length; i++) {
    const headerGroup: any =
      i === 0 ? headerGroups[i].headers : resultHeaderGroups[i];

    // 행 객체 평면화
    const preHeaders = headerGroup.map((header: any) =>
      header.isPlaceholder
        ? {
            ...header,
            isPlaceholder: false,
            rowSpan: tableHeaderGroups.length - i,
          }
        : { ...header, rowSpan: 1 }
    );
    resultHeaderGroups.pop(); // 마지막 배열을 꺼냄
    resultHeaderGroups.push(preHeaders); // 수정된 배열을 저장
    preHeaders.forEach((preHeader: any) => headerIds.add(preHeader.column.id)); // 현재까지 보유한 header 누적

    const targetHeaders = headerGroups[i + 1].headers;
    const newHeaders = targetHeaders.filter(
      (header) => !headerIds.has(header.column.id)
    );
    resultHeaderGroups.push(newHeaders);

    if (i === headerGroups.length - 2) {
      break;
    }
  }
  return resultHeaderGroups;
}

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.group({
    header: "Name",

    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => "Last Name",
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",

    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => "Visits",
          }),
          columnHelper.accessor("status", {
            header: "Status",
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
          }),
        ],
      }),
    ],
  }),
];

const data = ref(defaultData);

const rerender = () => {
  data.value = defaultData;
};

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="w-full overflow-auto">
    <table class="w-full">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <template v-for="header in headerGroup.headers" :key="header.id">
            <th :colSpan="header.colSpan">
              {{ console.log(header) }}
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="h-4" />
    <button @click="rerender" class="border p-2">Rerender</button>
  </div>
  <table class="a_table">
    <thead>
      <tr>
        <th rowspan="3">ID</th>
        <th rowspan="3">firstName</th>
        <th rowspan="3">lastName</th>
        <th colspan="4">Info</th>
        <th rowspan="3">Created At</th>
      </tr>
      <tr>
        <th rowspan="2">Age</th>
        <th colspan="3">I-More Info</th>
      </tr>
      <tr>
        <th>Visits</th>
        <th>Status</th>
        <th>Profile Progress</th>
      </tr>
    </thead>
  </table>
</template>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
</style>

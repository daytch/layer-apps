<script setup lang="ts">
import type { TableHeaderType } from "~/types/ui";

const columns: TableHeaderType[] = [
  {
    label: "Tanggal",
    key: "date",
    visible: true,
  },
  {
    label: "Umur (Hr)",
    key: "age_day",
    visible: true,
  },
  {
    label: "Umur (Mgg)",
    key: "age_month",
    visible: true,
  },
  {
    label: "POP",
    key: "pop",
    visible: true,
  },
  {
    label: "M",
    key: "m",
    visible: true,
  },
  {
    label: "AFK",
    key: "afk",
    visible: true,
  },
  {
    label: "Jual",
    key: "sell",
    visible: true,
  },
  {
    label: "POP Akhir",
    key: "end_pop",
    visible: true,
  },
  {
    label: "Pakan",
    key: "food",
    visible: true,
    subHeader: [
      {
        label: "Jenis",
        key: "food_type",
        visible: true,
      },
      {
        label: "KG",
        key: "food_kg",
        visible: true,
      },
      {
        label: "FIT (gr/ek)",
        key: "food_fit",
        visible: true,
      },
    ],
  },
];
</script>

<template>
  <DashboardContainer>
    <DashboardHeadingTitle>Produksi Telur</DashboardHeadingTitle>
    <ProduksiTelurTable />
  </DashboardContainer>
</template>

<script setup lang="ts">
const {
  visibleColumns,
  HeaderVisibleToogleColumn,
  checkAll,
  checkVisibleColumn,
} = useDataTable();
</script>

<template>
  <ProduksiTelurFilter :container-class="'bg-white'" />
  <ProduksiTelurTable />
</template>

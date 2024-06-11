<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Report SOP Harian | Layer Apps",
  description: "Report SOP Harian | Layer Apps",
});
const { getAllSopsByRoleId } = useFetchSOP();
const { data } = await useAsyncData(ASYNC_KEY.SOP_ANAK_KANDANG, async () =>
  getAllSopsByRoleId(4)
);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-white">
    <SOPTemplate :sop-items="data || []" />
  </div>
</template>

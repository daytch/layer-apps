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
const { getSOPByUser } = useFetchSOP();
const { data, pending } = await useAsyncData(
  ASYNC_KEY.SOP_BY_USER,
  async () => getSOPByUser(),
  {
    lazy: true,
  }
);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-white">
    <SOPTemplate :sop-items="data || []" :is-loading="pending" />
  </div>
</template>

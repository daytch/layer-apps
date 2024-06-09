<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Progress SOP Anak Kandang | Layer Apps",
  description: "Progress SOP Anak Kandang | Layer Apps",
});
const { queryParams } = useQueryParams();
const { getAllSopsByRoleId, checkSOPProgress } = useFetchSOP();
const { data: responseData, pending } = await useAsyncData(
  ASYNC_KEY.sopProgress(4),
  async () => {
    return Promise.all([
      getAllSopsByRoleId(4),
      checkSOPProgress(4, queryParams.value["tanggal"] as string),
    ]);
  },
  {
    lazy: true,
    transform: transformSOPProgressResponseData,
    watch: [queryParams],
  }
);
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-9 bg-[--app-gray-200]">
    <ProgressAnakKandangTemplate
      :data="{
        sopData: responseData?.sopData || [],
        progressData: responseData?.progressData || [],
      }"
      :is-loading="pending"
      :title="'Cek progress SOP Anak Kandang'"
      :back-link="'/dashboard/management-sop?tab=Anak+Kandang'"
    />
  </div>
</template>

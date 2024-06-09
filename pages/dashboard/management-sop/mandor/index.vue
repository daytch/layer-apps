<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Progress SOP Mandor | Layer Apps",
  description: "Progress SOP Mandor | Layer Apps",
});
const { queryParams } = useQueryParams();
const { getAllSopsByRoleId, checkSOPProgress } = useFetchSOP();
const { data: responseData, pending } = await useAsyncData(
  ASYNC_KEY.sopProgress(3),
  async () => {
    return Promise.all([
      getAllSopsByRoleId(3),
      checkSOPProgress(3, queryParams.value["tanggal"] as string),
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
      :title="'Cek progress SOP Mandor'"
      :back-link="'/dashboard/management-sop?tab=Mandor'"
    />
  </div>
</template>

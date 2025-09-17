<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import { UI_PRIMARY_BUTTON_STYLES } from "~/constants/ui";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Report SOP Harian | Layer Apps",
  description: "Report SOP Harian | Layer Apps",
});
const { getSOPByUser, runSOPScheduler } = useFetchSOP();
const { queryParams } = useQueryParams();
const isRunningScheduler = ref(false);

const { data, pending, refresh } = await useAsyncData(
  ASYNC_KEY.SOP_BY_USER,
  async () => {
    if (!queryParams.value["coopId"]) return;
    return getSOPByUser(queryParams.value["coopId"]?.toString());
  },
  {
    lazy: true,
    watch: [queryParams],
  }
);

const handleRefreshSOP = async () => {
  isRunningScheduler.value = true;
  await runSOPScheduler();
  await refresh();
  isRunningScheduler.value = false;
};
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-white">
    <div
      class="flex justify-end mb-6 [&>button]:max-w-[300px]"
      v-if="!data?.length"
    >
      <UButton
        @click="handleRefreshSOP"
        type="button"
        :disabled="isRunningScheduler"
        block
        class="mt-[10px]"
        size="md"
        :ui="UI_PRIMARY_BUTTON_STYLES"
        >{{ isRunningScheduler ? "TUNGGU..." : "REFRESH SOP" }}</UButton
      >
    </div>
    <SOPTemplate :sop-items="data || []" :is-loading="pending" />
  </div>
</template>

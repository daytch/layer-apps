<script setup lang="ts">
import { ASYNC_KEY } from "~/constants/api";
import type { GetEggParams } from "~/types/egg";

const { queryParams } = useQueryParams();
const { getEggDataByCoopAndPeriode } = useFetchEggData();

const { data, pending } = await useAsyncData(
  ASYNC_KEY.EGG_DATA,
  async () => {
    const params: GetEggParams = {};
    const queryCoopId = queryParams.value["coopId"];
    const queryPeriod = queryParams.value["period"];

    if (!!queryCoopId?.toString().length && !isNaN(Number(queryCoopId))) {
      params["coopId"] = Number(queryParams.value["coopId"]);
    }
    params["period"] =
      !!queryPeriod?.toString().length && isValidDate(queryPeriod?.toString())
        ? queryPeriod?.toString()
        : undefined;
    return getEggDataByCoopAndPeriode(params);
  },
  { lazy: true, watch: [queryParams] }
);
</script>

<template>
  <ProduksiTelurFilter
    :container-class="'bg-white'"
    :is-fetching-data="pending"
  />
  <ProduksiTelurTable :egg-data="data || []" :is-loading-data="pending" />
</template>

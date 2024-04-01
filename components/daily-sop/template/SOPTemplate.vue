<script setup lang="ts">
import type { SOPItem } from "~/types/sop";
const { handleDeselectSOPItem } = useSelectSOP();

const SOP_DUMMY_DATA = ref<Array<SOPItem>>([
  {
    id: "0c40fdc4-f2f8-46bd-8fb3-0778b27b0315",
    title: "Cek Ketebalan Pakan",
    time: "05:00",
    isDone: false,
  },
  {
    id: "d8383be4-2951-43f6-a16f-ba0cf8764c08",
    title: "Beri Makan Pagi Ayam",
    time: "05:00",
    isDone: false,
  },
  {
    id: "3917b9de-64ad-4641-b22e-458280bf0a28",
    title: "Beri Makan Pagi Ayam",
    time: "05:00",
    isDone: true,
  },
]);

const handleConfim = (item: SOPItem | null) => {
  if (!item) return;
  SOP_DUMMY_DATA.value = SOP_DUMMY_DATA.value.map((data) => {
    if (data.id === item.id) {
      data.isDone = true;
    }
    return data;
  });
  handleDeselectSOPItem();
};
</script>

<template>
  <SOPConfirmModal @handle-confirm="handleConfim" />
  <DashboardContainer>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
      <template v-for="data in SOP_DUMMY_DATA">
        <SOPCard
          :id="data.id"
          :role="'MANDOR'"
          :activity="data.title"
          :time="data.time"
          :is-done="data.isDone"
        />
      </template>
    </div>
  </DashboardContainer>
</template>

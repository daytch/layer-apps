<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["dashboard"],
});
useSeoMeta({
  title: "Realtime CCTV | Layer Apps",
  description: "Realtime CCTV | Layer Apps",
});

interface CCTVData {
  id: number;
  name: string;
  code: string;
  status: string;
  videoUrl: string;
}

const cctvList = ref<CCTVData[]>([
  {
    id: 1,
    name: "Jl Pademangan VIII",
    code: "CAM-002",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Jl-Pademangan-VIII-002/video.m3u8?token=97fcb83d782822e6c40b5a459a0ddcbc366325c1-1778aec78f275b7516ab862a5cabf46e-1789579108-1789575508",
  },
  {
    id: 2,
    name: "Kuningan Timur 004",
    code: "CAM-004",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Kuningan-Timur-002/video.m3u8?token=ed8cf14de11f71a21ab41862c82bc4d03556627e-2a9753e796a1588f390c6c83b4aed7c0-1789580073-1789576473",
  },
  {
    id: 3,
    name: "Monas Barat 10",
    code: "CAM-003",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Monas-Barat-010/video.m3u8?token=e933c0e6684f1bdd27469ed3d4f703316c665bba-ca8168d775d8bc17b6889daf0179e24e-1789580004-1789576404",
  },
  {
    id: 4,
    name: "Monas Barat 9",
    code: "CAM-004",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Monas-Barat-009/video.m3u8?token=5f5b3708667ae2e99e70b941bc5d47e607d4e41d-db26797924ffd7353f5d9dd97340dc98-1789579929-1789576329",
  },
  {
    id: 5,
    name: "Bintaro 003",
    code: "CAM-005",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Monas-Barat-009/video.m3u8?token=5f5b3708667ae2e99e70b941bc5d47e607d4e41d-db26797924ffd7353f5d9dd97340dc98-1789579929-1789576329",
  },
  {
    id: 6,
    name: "Bendungan Hilir 003",
    code: "CAM-006",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Bendungan-Hilir-003/video.m3u8?token=1e6252fac9e6732b6dabceaa2799e5fbec7f6cbc-c28b89c94f950b9f7ce2381d99a8b056-1789579738-1789576138",
  },
  {
    id: 7,
    name: "Cempaka Putih Barat 003",
    code: "CAM-007",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Cempaka-Putih-Barat-003/video.m3u8?token=6f73ae469e5511b77fc068c40481f5379381ec82-81ed4fd9d31ed528ecae852f0795ac9b-1789580431-1789576831",
  },
  {
    id: 8,
    name: "Gambir004",
    code: "CAM-008",
    status: "Connected",
    videoUrl:
      "https://cctv.molecool.id/Gambir-004/video.m3u8?token=228370a9ef0a7725fd768455bf82cbf4c7e1e60e-3397e38e268785ed79d8d34c9a32edb3-1789580611-1789577011",
  },
]);
const showCCTVModal = ref(false);
const selectedCCTV = ref<CCTVData | null>(null);

// 4. Fungsi yang dipanggil saat event @on-select-card memicu (Fix Error TypeScript)
const handleSelectCard = (cctv: CCTVData) => {
  selectedCCTV.value = cctv;
  showCCTVModal.value = true;
};
</script>

<template>
  <div class="content-wrapper-height pb-10 pt-[14px] bg-[--app-gray-200]">
    <DashboardContainer>
      <DashboardHeadingTitle>Realtime CCTV</DashboardHeadingTitle>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <!-- 4. PANGGIL CARD DENGAN V-FOR -->
        <RealtimeCCTVCard
          v-for="cctv in cctvList"
          :key="cctv.id"
          :cctv="cctv"
          @on-select-card="handleSelectCard(cctv)"
        />
      </div>
    </DashboardContainer>
  </div>

  <UModal
    v-model="showCCTVModal"
    :ui="{
      strategy: 'override',
      background: 'bg-transparent',
      overlay: { background: 'bg-[#111928]/60' },
      container: 'flex min-h-full items-center justify-center',
    }"
  >
    <!-- 5. KIRIM DATA YANG DI-KLIK KE MODAL -->
    <RealtimeCCTVModal
      :cctv="selectedCCTV"
      @handle-close-modal="showCCTVModal = false"
    />
  </UModal>
</template>

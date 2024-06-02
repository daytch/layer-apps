import type { Menu } from "~/types/dashboard-menu";
import IconHome from "~/components/ui/icon/IconHome.vue";
import IconEgg from "~/components/ui/icon/IconEgg.vue";
import IconMedicine from "~/components/ui/icon/IconMedicine.vue";
import IconReport from "~/components/ui/icon/IconReport.vue";
import IconFCR from "~/components/ui/icon/IconFCR.vue";
import IconWarehouse from "~/components/ui/icon/IconWarehouse.vue";
import IconChecklist from "~/components/ui/icon/IconChecklist.vue";
import IconMoneyReceive from "~/components/ui/icon/IconMoneyReceive.vue";
import IconSetting from "~/components/ui/icon/IconSetting.vue";
import IconCamera from "~/components/ui/icon/IconCamera.vue";

export const DASHBOARD_MENU: Menu[] = [
  {
    text: "Dashboard",
    icon: IconHome,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard",
  },
  {
    text: "Produksi Telur",
    icon: IconEgg,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/produksi-telur",
  },
  {
    text: "Stok Pakan & Obat",
    icon: IconMedicine,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard/stok-pakan-obat",
  },
  {
    text: "Laporan Hasil Bulanan",
    icon: IconReport,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/laporan-hasil-bulanan",
  },
  {
    text: "Grafik FCR Harian",
    icon: IconFCR,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/grafik-fcr",
  },
  {
    text: "Diagnosis Kandang",
    icon: IconWarehouse,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard/diagnosis-kandang",
  },
  {
    text: "SOP Kandang",
    icon: IconChecklist,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/management-sop",
  },
  {
    text: "Cashflow",
    icon: IconMoneyReceive,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/cashflow",
  },
  {
    text: "User Management",
    icon: IconSetting,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/users",
  },
];

export const DASHBOARD_MENU_SP: Menu[] = [
  {
    text: "Dashboard",
    icon: IconHome,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard",
  },
  {
    text: "Produksi Telur",
    icon: IconEgg,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/produksi-telur",
  },
  {
    text: "Stok Pakan & Obat",
    icon: IconMedicine,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard/stok-pakan-obat",
  },
  {
    text: "Laporan Hasil Bulanan",
    icon: IconReport,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/laporan-hasil-bulanan",
  },
  {
    text: "Grafik FCR Harian",
    icon: IconFCR,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/grafik-fcr",
  },
  {
    text: "Diagnosis Kandang",
    icon: IconWarehouse,
    roles: ["Superadmin", "Admin", "Mandor", "Anak Kandang"],
    to: "/dashboard/diagnosis-kandang",
  },
  {
    text: "SOP Kandang",
    icon: IconChecklist,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/management-sop",
  },
  {
    text: "Cashflow",
    icon: IconMoneyReceive,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/cashflow",
  },
  {
    text: "User Management",
    icon: IconSetting,
    roles: ["Superadmin", "Admin"],
    to: "/dashboard/users",
  },
  {
    text: "Realtime CCTV",
    icon: IconCamera,
    roles: ["Superadmin", "Admin", "Mandor"],
    to: "/dashboard/realtime-cctv",
  },
];

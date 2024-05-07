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

export const DASHBOARD_MENU: Menu[] = [
  {
    text: "Dashboard",
    icon: IconHome,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard",
  },
  {
    text: "Produksi Telur",
    icon: IconEgg,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/",
  },
  {
    text: "Stok Pakan & Obat",
    icon: IconMedicine,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/stok-pakan-obat",
  },
  {
    text: "Laporan Hasil Bulanan",
    icon: IconReport,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/laporan-hasil-bulanan",
  },
  {
    text: "Grafik FCR Harian",
    icon: IconFCR,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/grafik-fcr",
  },
  {
    text: "Diagnosis Kandang",
    icon: IconWarehouse,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/diagnosis-kandang",
  },
  {
    text: "SOP Kandang",
    icon: IconChecklist,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/management-sop",
  },
  {
    text: "Cashflow",
    icon: IconMoneyReceive,
    roles: ["ADMIN", "MANDOR", "SUPERADMIN", "MEMBER"],
    to: "/dashboard/cashflow",
  },
  {
    text: "User Management",
    icon: IconSetting,
    roles: ["ADMIN", "SUPERADMIN"],
    to: "/dashboard/users",
  },
];

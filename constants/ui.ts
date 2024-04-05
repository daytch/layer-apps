import { type SelectOptionType } from "~/types/ui";

const TOAST_BASE_UI = {
  container: "relative overflow-hidden [&>*:first-child]:items-center",
  ring: "ring-none",
  actions: "hidden",
  progress: {
    base: "hidden",
  },
};

export const TOAST_SUCCESS_UI = {
  ...TOAST_BASE_UI,
  background: "bg-[--app-primary-700]",
  title: "text-[#004434]",
};

export const ROLE_OPTIONS: SelectOptionType[] = [
  {
    value: "MEMBER",
    label: "Anak Kandang",
  },
  {
    value: "MANDOR",
    label: "Mandor",
  },
  {
    value: "SUPERADMIN",
    label: "Superadmin",
  },
  {
    value: "ADMIN",
    label: "Admin",
  },
];

import { type SelectOptionType } from "~/types/ui";

const TOAST_BASE_UI = {
  container: "relative overflow-hidden [&>*:first-child]:items-center",
  ring: "ring-none",
  actions: "hidden",
  progress: {
    base: "hidden",
  },
  icon: {
    base: "hidden",
  },
};

export const TOAST_SUCCESS_UI = {
  ...TOAST_BASE_UI,
  background: "bg-[--app-primary-700]",
  title: "text-[#004434]",
};

export const TOAST_ERROR_UI = {
  ...TOAST_BASE_UI,
  background: "bg-red-500",
  title: "text-white",
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

export const UI_CARD_STYLES = {
  ring: "",
  divide: "",
  rounded: "rounded-[14px]",
  shadow: "",
  body: {
    base: "mb-[50px]",
    background: "",
    padding: "px-10",
  },
  header: {
    base: "",
    background: "",
    padding: "px-10 pt-10",
  },
  footer: {
    base: "",
    background: "",
    padding: "px-10 pb-10",
  },
};

export const UI_GHOST_BUTTON_STYLES = {
  strategy: "override",
  padding: {
    md: "py-[13px] px-7",
  },
  color: {
    sky: {
      ghost: "bg-white text-[--app-dark-100] disabled:cursor-not-allowed ring-1 ring-[#DFE4EA]",
    },
  },
};

export const UI_PRIMARY_BUTTON_STYLES = {
  strategy: "override",
  padding: {
    md: "py-[13px] px-7",
  },
  color: {
    primary: {
      solid:
        "bg-[--app-primary-100] ring-[--app-primary-100] text-white disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed",
    },
  },
};

export const UI_PRIMARY_GHOST_BUTTON_STYLES = {
  strategy: "override",
  padding: {
    md: "py-[13px] px-7",
  },
  color: {
    primary: {
      ghost:
        "bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed",
    },
  },
};

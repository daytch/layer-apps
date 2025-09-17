import { type SelectOptionType } from "~/types/ui";

//
// TOAST UI
//
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
  base: "bg-[--app-primary-700]",
  title: "text-[#004434]",
};

export const TOAST_ERROR_UI = {
  ...TOAST_BASE_UI,
  base: "bg-red-500",
  title: "text-white",
};

//
// ROLE OPTIONS
//
export const ROLE_OPTIONS: SelectOptionType[] = [
  { value: "MEMBER", label: "Anak Kandang" },
  { value: "MANDOR", label: "Mandor" },
  { value: "SUPERADMIN", label: "Superadmin" },
  { value: "ADMIN", label: "Admin" },
];

//
// CARD UI
//
export const UI_CARD_STYLES = {
  base: "rounded-[14px] shadow-none ring-0 divide-none",
  body: {
    base: "mb-[50px] card-body p-0",
  },
  header: {
    base: "card-header p-0",
  },
  footer: {
    base: "card-footer p-0",
  },
};


//
// BUTTON UI
//
export const UI_GHOST_BUTTON_STYLES = {
  base: "py-[13px] px-7 rounded-lg font-medium transition-colors",
  color: {
    sky: "bg-white text-[--app-dark-100] ring-1 ring-[#DFE4EA] disabled:cursor-not-allowed",
  },
  label: "text-sm",
};

export const UI_PRIMARY_BUTTON_STYLES = {
  base: "py-[13px] px-7 rounded-lg font-medium transition-colors",
  color: {
    primary:
      "bg-[--app-primary-100] ring-[--app-primary-100] text-white hover:bg-[--app-primary-200] disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed",
  },
  label: "text-sm",
};

export const UI_PRIMARY_GHOST_BUTTON_STYLES = {
  base: "py-[13px] px-7 rounded-lg font-medium transition-colors",
  color: {
    primary:
      "bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] hover:bg-gray-50 disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed",
  },
  label: "text-sm",
};

export const UI_PRIMARY_OUTLINE_BUTTON = {
  base: "text-center min-w-[92px] flex-1 md:flex-auto py-3 px-4 rounded-lg font-medium transition-colors",
  inline: "inline-flex items-center justify-center",
  label: "text-sm",
  color: {
    primary:
      "bg-white ring-1 ring-[--app-primary-100] text-[--app-primary-100] hover:bg-gray-50 disabled:bg-[--app-dark-800] disabled:text-[--app-dark-500] disabled:cursor-not-allowed",
  },
};
export const UI_MODAL_STYLES = {
  base: "bg-transparent",
  overlay: "bg-[#111928]/60",
  container: "flex min-h-full items-center justify-center",
};
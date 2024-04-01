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

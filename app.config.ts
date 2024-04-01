export default defineAppConfig({
  nuxtIcon: {},
  ui: {
    strategy: "override",
    notifications: {
      position: "top-[50px] bottom-auto left-1/2 -translate-x-1/2",
      actions: "hidden",
    },
    notification: {
      background: "bg-{color}-800/50",
    },
    button: {
      color: {
        primary: {
          solid: "bg-[--app-primary-100] text-white",
        },
      },
      size: {
        xs: "p-3 text-md",
        md: "py-3 px-5 text-base font-medium",
      },
      icon: {
        size: {
          xs: "w-[15px] h-[10px]",
        },
      },
      default: {
        size: "md",
        color: "primary",
        variant: "solid",
      },
    },
    input: {
      base: "placeholder-[--app-dark-600] w-full",
      size: {
        md: "py-3 px-5 text-base",
      },
      default: {
        size: "md",
      },
    },
    container: {
      base: "mx-auto",
      padding: "px-6 sm:px-6 lg:px-8",
      constrained: "max-w-7xl",
    },
    formGroup: {
      label: {
        base: "text-[--app-dark-100] md:text-base",
      },
      container: "mt-[10px]",
    },
  },
});

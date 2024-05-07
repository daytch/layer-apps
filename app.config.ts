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
        xs: "text-md",
        md: "text-base font-medium",
      },
      padding: {
        xs: "p-3",
        md: "py-3 px-5",
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
      base: "placeholder-[--app-dark-600] w-full border-0 disabled:bg-[--app-gray-200] disabled:cursor-not-allowed",
      size: {
        md: "text-base",
      },
      padding: {
        md: "py-3 px-5 ",
      },
      color: {
        white: {
          outline:
            "bg-white text-[--app-primary-text] ring-1 ring-[#DFE4EA] focus:ring-2 focus:ring-[--app-primary-100] border-0",
        },
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
    inputMenu: {
      base: "border-0",
      option: {
        size: "text-base",
      },
    },
    checkbox: {
      label: "text-base text-[--app-dark-100]",
      base: "w-5 h-5",
    },
    textarea: {
      base: "placeholder-[--app-dark-600] w-full border-0 disabled:bg-[--app-gray-200] disabled:cursor-not-allowed",
      size: {
        md: "text-base",
      },
      padding: {
        md: "py-3 px-5 ",
      },
      color: {
        white: {
          outline:
            "bg-white text-[--app-primary-text] ring-1 ring-[#DFE4EA] focus:ring-2 focus:ring-[--app-primary-100] border-0",
        },
      },
      default: {
        size: "md",
      },
    },
  },
});

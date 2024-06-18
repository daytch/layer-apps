import { TOAST_ERROR_UI, TOAST_SUCCESS_UI } from "~/constants/ui";

type ToastType = "ERROR" | "SUCCESS";

export const useShowToast = () => {
  const toast = useToast();

  const successToast = (message: string) => {
    toast.add({
      icon: "i-heroicons-check-circle-16-solid",
      title: message,
      ui: {
        ...TOAST_SUCCESS_UI,
      },
    });
  };

  const errorToast = (message: string) => {
    toast.add({
      icon: "i-heroicons-x-circle",
      title: message,
      ui: {
        ...TOAST_ERROR_UI,
      },
    });
  };

  const handleShowToast = ({ type, message }: { type: ToastType; message: string }) => {
    if (type === "ERROR") {
      errorToast(message);
    } else {
      successToast(message);
    }
  };

  return { handleShowToast };
};

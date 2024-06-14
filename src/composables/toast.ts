import { useToast as useLibraryToast, TYPE } from 'vue-toastification';
import AppToast from '@/components/AppToast.vue';

type ToastParams = string | {
  title?: string;
  message: string;
  timeout?: number;
};

const SUCCESS_TIMEOUT = 4000;

export function useToast() {
  function openToast(type: TYPE, options: ToastParams) {
    const toast = useLibraryToast();

    const toastId = toast({
      component: AppToast,
      type,
      props: {
        closable: true,
        variant: 'elevated',
        title: (typeof options === 'string') ? '' : options.title || '',
        message: (typeof options === 'string') ? options : options.message,
        type,
      },
    });

    const timeout = (typeof options !== 'string') ? options.timeout : undefined;

    if (type === TYPE.SUCCESS || timeout) {
      setTimeout(() => toast.dismiss(toastId), timeout || SUCCESS_TIMEOUT);
    }
  }

  function info(options: ToastParams) {
    openToast(TYPE.INFO, options);
  }

  function success(options: ToastParams) {
    openToast(TYPE.SUCCESS, options);
  }

  function warning(options: ToastParams) {
    openToast(TYPE.WARNING, options);
  }

  function error(options: ToastParams) {
    openToast(TYPE.ERROR, options);
  }

  return {
    info,
    success,
    warning,
    error,
  };
}

import { toast, ToastOptions } from 'react-toastify';

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    className:
      'flex items-center gap-2 bg-pollloop-light-beige text-pollloop-brown-01 rounded-lg p-4 text-sm font-medium w-fit',
    autoClose: 3000,
    ...options,
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    className:
      'flex items-center gap-2 bg-pollloop-light-beige text-status-red-text rounded-lg p-4 text-sm font-medium w-fit ',
    autoClose: 3000,
    ...options,
  });
};

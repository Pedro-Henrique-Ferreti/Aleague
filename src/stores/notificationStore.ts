import type { State } from '@/types/NotificationStore';
import type { Snackbar } from '@/types/Snackbar';
import { MIN_SNACKBAR_DURATION } from '@/constants';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: (): State => {
    return {
      snackbarQueue: [],
    };
  },
  actions: {
    openSnackbarNotification({ message, type, duration }: Snackbar) {
      const id = new Date().getTime();
      const snackbarDuration = (duration && duration >= MIN_SNACKBAR_DURATION)
        ? duration
        : MIN_SNACKBAR_DURATION;

      this.snackbarQueue.push({
        id,
        message,
        type: type || 'success',
        duration: snackbarDuration,
      });

      setTimeout(() => {
        this.closeSnackbarNotification(id);
      }, snackbarDuration);
    },
    closeSnackbarNotification(snackbarId: number) {
      this.snackbarQueue = this.snackbarQueue.filter(({ id }) => id !== snackbarId);
    },
  },
});

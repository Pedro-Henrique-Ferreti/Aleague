import type { Snackbar } from '@/types/Snackbar';
import { MIN_DURATION } from '@/constants/snackbar';
import { defineStore } from 'pinia';

interface State {
  activeSnackbar: Snackbar | null;
  snackbarQueue: Snackbar[];
}

export const useNotificationStore = defineStore('notification', {
  state: (): State => {
    return {
      activeSnackbar: null,
      snackbarQueue: [],
    };
  },
  actions: {
    openSnackbarNotification({ message, type, duration }: Snackbar) {
      const snackbarDuration = (duration && duration >= MIN_DURATION)
        ? duration
        : MIN_DURATION;

      this.snackbarQueue.push({
        message,
        type: type || 'success',
        duration: snackbarDuration,
      });

      this.updateSnackbarQueue();
    },
    closeSnackbarNotification() {
      this.activeSnackbar = null;

      if (this.snackbarQueue.length > 0) {
        // Awaits snackbar animation to finish
        setTimeout(this.updateSnackbarQueue, 400);
      }
    },
    updateSnackbarQueue() {
      if (!this.activeSnackbar && this.snackbarQueue.length > 0) {
        this.activeSnackbar = this.snackbarQueue.shift() as Snackbar;

        setTimeout(this.closeSnackbarNotification, this.activeSnackbar.duration);
      }
    },
  },
});

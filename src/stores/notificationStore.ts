import type { State } from '@/types/NotificationStore';
import type { Snackbar } from '@/types/Snackbar';
import { MIN_SNACKBAR_DURATION } from '@/constants';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: (): State => {
    return {
      activeSnackbar: null,
      snackbarQueue: [],
    };
  },
  actions: {
    openSnackbarNotification({ message, type, duration }: Snackbar) {
      const snackbarDuration = (duration && duration >= MIN_SNACKBAR_DURATION)
        ? duration
        : MIN_SNACKBAR_DURATION;

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

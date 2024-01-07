import type { Snackbar } from '@/types/Snackbar';
import { MIN_DURATION_SUCCESS, MIN_DURATION_ERROR } from '@/constants/snackbar';
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
    openSnackbarNotification({ message, type = 'success', duration }: Snackbar) {
      let snackbarDuration = duration;

      if (type === 'success' && (!snackbarDuration || snackbarDuration < MIN_DURATION_SUCCESS)) {
        snackbarDuration = MIN_DURATION_SUCCESS;
      }

      if (type === 'error' && (!snackbarDuration || snackbarDuration < MIN_DURATION_ERROR)) {
        snackbarDuration = MIN_DURATION_ERROR;
      }

      this.snackbarQueue.push({
        message,
        type,
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

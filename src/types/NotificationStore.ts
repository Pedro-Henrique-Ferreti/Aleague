import type { Snackbar } from './Snackbar';

interface SnackbarQueueItem extends Snackbar {
  id: number;
}

export interface State {
  snackbarQueue: SnackbarQueueItem[];
}
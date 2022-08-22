import type { Snackbar } from './Snackbar';

export interface State {
  activeSnackbar: Snackbar | null;
  snackbarQueue: Snackbar[];
}
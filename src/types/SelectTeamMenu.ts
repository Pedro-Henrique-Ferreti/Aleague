import type { TeamPreview } from './Team';

export interface SelectTeamMenuOption extends TeamPreview {
  disabled?: boolean;
  labelText?: string;
}

export enum TeamType {
  CLUB,
  NATIONAL,
  CUSTOM,
}

export interface TeamDetails {
  id: string;
  name: string;
  country: string;
  badge: string;
  type: TeamType;
}

export type Team = Pick<TeamDetails, 'id' | 'name'>;

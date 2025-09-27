export interface TeamDetails {
  id: number;
  name: string;
  country: string;
  badge: string;
  custom?: boolean;
  national?: boolean;
}

export type Team = Pick<TeamDetails, 'id' | 'name'>;

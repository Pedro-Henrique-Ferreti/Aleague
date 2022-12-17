export interface Playoff {
  id: number;
  hashid: string;
  name: string;
  numberOfTeams: number | null;
	numberOfLegs: 1 | 2 | null,
	numberOfRounds: number | null,
  createdAt: string;
  updatedAt: string;
}
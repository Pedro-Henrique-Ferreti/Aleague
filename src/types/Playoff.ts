export interface Playoff {
  id: number;
  hashid: string;
  name: string;
  numberOfTeams: number | null;
	numberOfLegs: number | null,
	numberOfRounds: number | null,
  createdAt: string;
  updatedAt: string;
}
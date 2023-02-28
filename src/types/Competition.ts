export type CompetitionFormat = 'league' | 'cup' | 'playoff';

export interface CreateCompetitionSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface CompetitionListItem {
  id: string;
  name: string;
  createdAt: string;
  numberOfLegs: number | null;
  numberOfTeams: number | null;
  progress: number;
  type: CompetitionFormat;
  stepsCompleted: CreateCompetitionSteps;
  updatedAt: string;
}

export interface UpdateCompetitionParams {
  name: string;
}

export interface ReloadCompetitionParams {
  showLoader?: boolean;
}

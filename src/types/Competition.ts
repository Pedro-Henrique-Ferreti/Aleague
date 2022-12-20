import type { League } from './League';
import type { Playoff } from './Playoff';

export type CompetitionFormat = 'league' | 'cup' | 'playoff';

export interface CreateCompetitionSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export interface CompetitionListLeague extends League {
  type: CompetitionFormat;
  stepsCompleted: CreateCompetitionSteps;
}
export interface CompetitionListPlayoff extends Playoff {
  type: CompetitionFormat;
  progress: number;
  stepsCompleted: CreateCompetitionSteps;
}

export type CompetitionListItem = CompetitionListLeague | CompetitionListPlayoff;

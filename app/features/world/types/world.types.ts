export enum SeasonState {
  SETUP = 'setup',
  IN_PLAY = 'in-play',
  FINISHED = 'finished',
}

export type CompetitionScope = 'domestic' | 'regional' | 'continental' | 'worldwide';

export type WorldChampion = Pick<TeamDetails, 'name' | 'badge'>;

/** A tournament of the current season, shown inside its competition. */
export interface WorldTournamentSummary {
  id: string;
  name: string;
  teamsCount: number;
  /** Matches already played / total matches generated so far. `null` while the season is in setup. */
  matches: { played: number; total: number } | null;
  /** First-stage readiness while the season is in setup (SET-14). */
  isReady: boolean;
  /** Champion of the previous season (WLD-09). */
  lastChampion?: WorldChampion;
  /** Champion of the current season, once decided. */
  champion?: WorldChampion;
  hasIssue?: boolean;
}

export interface WorldCompetitionSummary {
  id: string;
  type: 'league' | 'cup';
  name: string;
  scope: CompetitionScope;
  /** One tournament per pyramid level (league) or a single one (cup). */
  tournaments: WorldTournamentSummary[];
}

export interface WorldSeasonSummary {
  label: string;
  nextLabel: string;
  state: SeasonState;
  /** Number of blocking issues in the formats/links being edited for next season (ADV-08). */
  blockingIssues: number;
}

export interface WorldOverview {
  name: string;
  description: string;
  createdAt: Timestamp;
  seasonLabelStyle: string;
  seasonsPlayed: number;
  teamsCount: number;
  season: WorldSeasonSummary;
  competitions: WorldCompetitionSummary[];
}

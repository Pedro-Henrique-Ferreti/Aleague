import { describe, expect, it } from 'vitest';
import { getStandingsDataFromScore, getTableEntriesByWeek, getTableEntry, getTableEntryForm, sortTableEntries, sortTableEntryByType } from '~/helpers/standings';

describe('standings', () => {
  describe('getStandingsDataFromScore', () => {
    it('should return correct standings data for home team win', () => {
      const result = getStandingsDataFromScore(3, 1, true);
      expect(result).toEqual({
        goalsFor: 3,
        goalsAgainst: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        points: POINTS_PER_WIN,
      });
    });

    it('should return correct standings data for away team win', () => {
      const result = getStandingsDataFromScore(1, 3, false);
      expect(result).toEqual({
        goalsFor: 3,
        goalsAgainst: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        points: POINTS_PER_WIN,
      });
    });

    it('should return correct standings data for home team loss', () => {
      const result = getStandingsDataFromScore(1, 3, true);
      expect(result).toEqual({
        goalsFor: 1,
        goalsAgainst: 3,
        won: 0,
        drawn: 0,
        lost: 1,
        points: POINTS_PER_LOSS,
      });
    });

    it('should return correct standings data for away team loss', () => {
      const result = getStandingsDataFromScore(3, 1, false);
      expect(result).toEqual({
        goalsFor: 1,
        goalsAgainst: 3,
        won: 0,
        drawn: 0,
        lost: 1,
        points: POINTS_PER_LOSS,
      });
    });

    it('should return correct standings data for draw', () => {
      const result = getStandingsDataFromScore(2, 2, true);
      expect(result).toEqual({
        goalsFor: 2,
        goalsAgainst: 2,
        won: 0,
        drawn: 1,
        lost: 0,
        points: POINTS_PER_DRAW,
      });
    });
  });

  describe('sortTableEntryByType', () => {
    const makeEntry = (points: number, won: number, lost: number, goalsFor: number, goalsAgainst: number): TableEntry => ({
      id: 'id',
      team: null,
      points,
      played: 0,
      drawn: 0,
      won,
      lost,
      goalsFor,
      goalsAgainst,
      form: [],
    });

    it('should sort by points descending', () => {
      const a = makeEntry(3, 0, 0, 0, 0);
      const b = makeEntry(6, 0, 0, 0, 0);

      expect(sortTableEntryByType(a, b, TableEntrySortType.POINTS)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.POINTS)).toBeLessThan(0);
    });

    it('should sort by won descending', () => {
      const a = makeEntry(0, 2, 0, 0, 0);
      const b = makeEntry(0, 5, 0, 0, 0);

      expect(sortTableEntryByType(a, b, TableEntrySortType.WON)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.WON)).toBeLessThan(0);
    });

    it('should sort by lost ascending (fewer losses first)', () => {
      const a = makeEntry(0, 0, 3, 0, 0);
      const b = makeEntry(0, 0, 1, 0, 0);

      expect(sortTableEntryByType(a, b, TableEntrySortType.LOST)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.LOST)).toBeLessThan(0);
    });

    it('should sort by goals for descending', () => {
      const a = makeEntry(0, 0, 0, 4, 0);
      const b = makeEntry(0, 0, 0, 7, 0);

      expect(sortTableEntryByType(a, b, TableEntrySortType.GOALS_FOR)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.GOALS_FOR)).toBeLessThan(0);
    });

    it('should sort by goals against ascending', () => {
      const a = makeEntry(0, 0, 0, 0, 5);
      const b = makeEntry(0, 0, 0, 0, 2);

      expect(sortTableEntryByType(a, b, TableEntrySortType.GOALS_AGAINST)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.GOALS_AGAINST)).toBeLessThan(0);
    });

    it('should sort by goals difference descending', () => {
      const a = makeEntry(0, 0, 0, 3, 2);
      const b = makeEntry(0, 0, 0, 5, 1);

      expect(sortTableEntryByType(a, b, TableEntrySortType.GOALS_DIFFERENCE)).toBeGreaterThan(0);
      expect(sortTableEntryByType(b, a, TableEntrySortType.GOALS_DIFFERENCE)).toBeLessThan(0);
    });
  });

  describe('sortTableEntries', () => {
    const makeEntry = (points: number, played: number, won: number, lost: number, goalsFor: number, goalsAgainst: number): TableEntry => ({
      id: 'id',
      team: null,
      points,
      played,
      drawn: 0,
      won,
      lost,
      goalsFor,
      goalsAgainst,
      form: [],
    });

    it('should sort by points descending by default', () => {
      const a = makeEntry(3, 1, 1, 0, 2, 1);
      const b = makeEntry(6, 1, 2, 0, 3, 1);

      expect(sortTableEntries(a, b)).toBeGreaterThan(0);
      expect(sortTableEntries(b, a)).toBeLessThan(0);
    });

    it('should use wins as first tiebreaker', () => {
      const a = makeEntry(6, 2, 2, 0, 3, 1);
      const b = makeEntry(6, 2, 1, 0, 3, 1);

      expect(sortTableEntries(a, b)).toBeLessThan(0);
      expect(sortTableEntries(b, a)).toBeGreaterThan(0);
    });

    it('should use goal difference as second tiebreaker', () => {
      const a = makeEntry(6, 2, 2, 0, 3, 1);
      const b = makeEntry(6, 2, 2, 0, 4, 1);

      expect(sortTableEntries(a, b)).toBeGreaterThan(0);
      expect(sortTableEntries(b, a)).toBeLessThan(0);
    });
  });

  describe('getTableEntryForm', () => {
    it('should return form entries for matches with scores', () => {
      const matchweeks: Matchweek[] = [{
        week: 1,
        matches: [{
          id: 'm1',
          homeTeam: { id: 'team-a', score: 2 },
          awayTeam: { id: 'team-b', score: 1 },
          kickoff: null,
        }],
      }];

      const result = getTableEntryForm(matchweeks, 'team-a');

      expect(result).toHaveLength(1);
      expect(result[0]?.week).toBe(1);
      expect(result[0]?.result).toBe(MatchResult.WON);
    });

    it('should skip matches without scores', () => {
      const matchweeks: Matchweek[] = [{
        week: 1,
        matches: [{
          id: 'm1',
          homeTeam: { id: 'team-a', score: null },
          awayTeam: { id: 'team-b', score: null },
          kickoff: null,
        }],
      }];

      expect(getTableEntryForm(matchweeks, 'team-a')).toEqual([]);
    });

    it('should skip matches that do not involve the specified team', () => {
      const matchweeks: Matchweek[] = [{
        week: 1,
        matches: [{
          id: 'm1',
          homeTeam: { id: 'team-a', score: 1 },
          awayTeam: { id: 'team-b', score: 1 },
          kickoff: null,
        }],
      }];

      expect(getTableEntryForm(matchweeks, 'team-c')).toEqual([]);
    });
  });

  describe('getTableEntry', () => {
    const makeEntry = (data: StandingsEntryData[]): StandingsEntry => ({
      id: 'entry-1',
      team: 'team-1',
      data: data as [StandingsEntryData, ...StandingsEntryData[]],
    });

    it('should aggregate overall data across all weeks', () => {
      const entry = makeEntry([
        { week: 1, type: TableEntryType.HOME, points: 3, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, form: [] },
        { week: 2, type: TableEntryType.AWAY, points: 1, played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, form: [] },
        { week: 3, type: TableEntryType.HOME, points: 0, played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, form: [] },
      ]);

      const result = getTableEntry(entry);

      expect(result.points).toBe(4);
      expect(result.played).toBe(3);
      expect(result.won).toBe(1);
      expect(result.drawn).toBe(1);
      expect(result.lost).toBe(1);
      expect(result.goalsFor).toBe(3);
      expect(result.goalsAgainst).toBe(3);
    });

    it('should filter by type when specified', () => {
      const entry = makeEntry([
        { week: 1, type: TableEntryType.HOME, points: 3, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, form: [] },
        { week: 2, type: TableEntryType.AWAY, points: 0, played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, form: [] },
      ]);

      const result = getTableEntry(entry, TableEntryType.HOME);

      expect(result.points).toBe(3);
      expect(result.played).toBe(1);
      expect(result.won).toBe(1);
      expect(result.drawn).toBe(0);
      expect(result.lost).toBe(0);
      expect(result.goalsFor).toBe(2);
      expect(result.goalsAgainst).toBe(0);
    });
  });

  describe('getTableEntriesByWeek', () => {
    it('should create weekly entries for the specified number of weeks', () => {
      const standings: StandingsEntry[] = [
        { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 3, played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, form: [] }] },
      ];

      const result = getTableEntriesByWeek(standings, 3);

      expect(result).toHaveLength(3);
      expect(result[0]?.week).toBe(1);
      expect(result[1]?.week).toBe(2);
      expect(result[2]?.week).toBe(3);
    });
  });
});

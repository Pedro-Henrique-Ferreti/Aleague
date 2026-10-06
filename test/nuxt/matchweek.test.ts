import { describe, expect, it, vi } from 'vitest';
import { getActiveMatchweekNumber, getExpectedMatchesPerWeek, getExpectedMatchweeksPerRoundRobin, getMaxPossibleMatchweeksPerRoundRobin, simulateMatchweek } from '~/helpers/matchweek';

describe('matchweek', () => {
  describe('getExpectedMatchesPerWeek', () => {
    it('should return the correct number of matches per week', () => {
      expect(getExpectedMatchesPerWeek(4)).toBe(2);
      expect(getExpectedMatchesPerWeek(6)).toBe(3);
      expect(getExpectedMatchesPerWeek(20)).toBe(10);
    });

    it('should handle invalid teamsCount', () => {
      expect(getExpectedMatchesPerWeek(-1)).toBe(0);
      expect(getExpectedMatchesPerWeek(1)).toBe(0);
      expect(getExpectedMatchesPerWeek(5)).toBe(0);
    });
  });

  describe('getMaxPossibleMatchweeksPerRoundRobin', () => {
    it('should return the correct number of matchweeks per round robin', () => {
      expect(getMaxPossibleMatchweeksPerRoundRobin(4)).toBe(3);
      expect(getMaxPossibleMatchweeksPerRoundRobin(8)).toBe(7);
      expect(getMaxPossibleMatchweeksPerRoundRobin(12)).toBe(11);
    });
  });

  describe('getExpectedMatchweeksPerRoundRobin', () => {
    it('should return the correct number of matchweeks per round robin', () => {
      expect(getExpectedMatchweeksPerRoundRobin(4)).toBe(3);
      expect(getExpectedMatchweeksPerRoundRobin(8)).toBe(7);
      expect(getExpectedMatchweeksPerRoundRobin(12, 4)).toBe(8);
      expect(getExpectedMatchweeksPerRoundRobin(16, 8)).toBe(8);
    });
  });

  describe('getActiveMatchweekNumber', () => {
    it('should return the first week with incomplete matches', () => {
      const matchweeks: Matchweek[] = [
        { week: 1, matches: [{ id: 'm1', homeTeam: { id: 'a', score: 1 }, awayTeam: { id: 'b', score: 0 }, kickoff: null }] },
        { week: 2, matches: [{ id: 'm2', homeTeam: { id: 'a', score: null }, awayTeam: { id: 'b', score: null }, kickoff: null }] },
        { week: 3, matches: [{ id: 'm3', homeTeam: { id: 'a', score: null }, awayTeam: { id: 'b', score: null }, kickoff: null }] },
      ];

      expect(getActiveMatchweekNumber(matchweeks)).toBe(2);
    });

    it('should return the last week when all matches are complete', () => {
      const matchweeks: Matchweek[] = [
        { week: 1, matches: [{ id: 'm1', homeTeam: { id: 'a', score: 1 }, awayTeam: { id: 'b', score: 0 }, kickoff: null }] },
        { week: 2, matches: [{ id: 'm2', homeTeam: { id: 'a', score: 2 }, awayTeam: { id: 'b', score: 1 }, kickoff: null }] },
      ];

      expect(getActiveMatchweekNumber(matchweeks)).toBe(2);
    });

    it('should return 1 when matchweeks array is empty', () => {
      expect(getActiveMatchweekNumber([])).toBe(1);
    });
  });

  describe('simulateMatchweek', () => {
    it('should simulate all matches in a matchweek', async () => {
      const matchweek: Matchweek = {
        week: 1,
        matches: [
          { id: 'm1', homeTeam: { id: 'a', score: null }, awayTeam: { id: 'b', score: null }, kickoff: null },
          { id: 'm2', homeTeam: { id: 'c', score: null }, awayTeam: { id: 'd', score: null }, kickoff: null },
        ],
      };

      await simulateMatchweek(matchweek);

      expect(matchweek.matches[0]?.homeTeam.score).not.toBeNull();
      expect(matchweek.matches[0]?.awayTeam.score).not.toBeNull();
      expect(matchweek.matches[1]?.homeTeam.score).not.toBeNull();
      expect(matchweek.matches[1]?.awayTeam.score).not.toBeNull();
    });

    it('should preserve completed matches when preserveCompletedMatches is true', async () => {
      const matchweek: Matchweek = {
        week: 1,
        matches: [
          { id: 'm1', homeTeam: { id: 'a', score: 1 }, awayTeam: { id: 'b', score: 0 }, kickoff: null },
          { id: 'm2', homeTeam: { id: 'c', score: null }, awayTeam: { id: 'd', score: null }, kickoff: null },
        ],
      };

      await simulateMatchweek(matchweek, { preserveCompletedMatches: true });

      expect(matchweek.matches[0]?.homeTeam.score).toBe(1);
      expect(matchweek.matches[0]?.awayTeam.score).toBe(0);
      expect(matchweek.matches[1]?.homeTeam.score).not.toBeNull();
      expect(matchweek.matches[1]?.awayTeam.score).not.toBeNull();
    });

    it('should call onMatchSimulated callback for each match', async () => {
      const matchweek: Matchweek = {
        week: 1,
        matches: [
          { id: 'm1', homeTeam: { id: 'a', score: null }, awayTeam: { id: 'b', score: null }, kickoff: null },
          { id: 'm2', homeTeam: { id: 'c', score: null }, awayTeam: { id: 'd', score: null }, kickoff: null },
        ],
      };
      const onMatchSimulated = vi.fn();

      await simulateMatchweek(matchweek, { onMatchSimulated });

      expect(onMatchSimulated).toHaveBeenCalledTimes(2);
    });
  });
});

import { describe, expect, it } from 'vitest';
import { getMatchResult, getRandomScore, newMatch } from '~/helpers/match';

describe('match', () => {
  describe('getMatchResult', () => {
    it('should return the correct match result', () => {
      expect(getMatchResult(2, 1, true)).toBe(MatchResult.WON);
      expect(getMatchResult(1, 2, true)).toBe(MatchResult.LOST);
      expect(getMatchResult(1, 1, true)).toBe(MatchResult.DRAW);
      expect(getMatchResult(2, 1, false)).toBe(MatchResult.LOST);
      expect(getMatchResult(1, 2, false)).toBe(MatchResult.WON);
      expect(getMatchResult(0, 0, false)).toBe(MatchResult.DRAW);
    });
  });

  describe('getRandomScore', () => {
    it('should return a non-negative integer', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomScore();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(result)).toBeTruthy();
      }
    });
  });

  describe('newMatch', () => {
    it('should accept home and away team ids', () => {
      const result = newMatch('team-a', 'team-b');

      expect(result.homeTeam.id).toBe('team-a');
      expect(result.awayTeam.id).toBe('team-b');
    });

    it('should generate unique ids for each match', () => {
      const match1 = newMatch();
      const match2 = newMatch();

      expect(match1.id).not.toBe(match2.id);
    });
  });
});

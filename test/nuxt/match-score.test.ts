import { describe, expect, it } from 'vitest';
import { newMatch } from '~/helpers/match';
import { getRandomScore, getSimulatedMatchScore, resetMatchScore } from '~/helpers/match-score';

describe('match-score', () => {
  describe('getRandomScore', () => {
    it('should return a non-negative integer', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomScore();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(result)).toBeTruthy();
      }
    });
  });

  describe('getSimulatedMatchScore', () => {
    it('should return a non-negative integer', () => {
      for (let i = 0; i < 100; i++) {
        const result = getSimulatedMatchScore(1, 2);

        expect(result.home).toBeGreaterThanOrEqual(0);
        expect(result.away).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(result.home)).toBeTruthy();
        expect(Number.isInteger(result.away)).toBeTruthy();
      }
    });
  });

  describe('resetMatchScore', () => {
    it('should reset the match score', () => {
      const match = newMatch();

      match.homeTeam.score = 2;
      match.awayTeam.score = 2;

      resetMatchScore(match);

      expect(match.homeTeam.score).toBeNull();
      expect(match.awayTeam.score).toBeNull();
    });
  });
});

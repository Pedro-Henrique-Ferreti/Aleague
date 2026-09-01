import { afterEach, describe, expect, it, vi } from 'vitest';
import { getRandomScore, getSimulatedMatchScore } from '~/helpers/match-score';

describe('match-score', () => {
  afterEach(() => vi.clearAllMocks());

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
});

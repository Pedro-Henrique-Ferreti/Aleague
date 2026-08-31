import { describe, expect, it } from 'vitest';
import { getRandomScore } from '~/helpers/match-simulation';

describe('match-simulation', () => {
  describe('getRandomScore', () => {
    it('should return a non-negative integer', () => {
      for (let i = 0; i < 100; i++) {
        const result = getRandomScore();

        expect(result).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(result)).toBeTruthy();
      }
    });
  });
});

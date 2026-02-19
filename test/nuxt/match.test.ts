import { describe, expect, it } from 'vitest';
import { getMatchResult } from '~/helpers/match';

describe('match', () => {
  describe('getMatchResult', () => {
    it('should return the correct match result', () => {
      expect(getMatchResult(2, 1, true)).toBe(MatchResult.WON);
      expect(getMatchResult(1, 2, true)).toBe(MatchResult.LOST);
      expect(getMatchResult(1, 1, true)).toBe(MatchResult.DRAW);
      expect(getMatchResult(1, 2, false)).toBe(MatchResult.LOST);
      expect(getMatchResult(1, 2, false)).toBe(MatchResult.WON);
      expect(getMatchResult(0, 0, false)).toBe(MatchResult.DRAW);
    });
  });
});

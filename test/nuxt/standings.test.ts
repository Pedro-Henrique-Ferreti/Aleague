import { describe, expect, it } from 'vitest';
import { getStandingsDataFromScore } from '~/helpers/standings';

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
});

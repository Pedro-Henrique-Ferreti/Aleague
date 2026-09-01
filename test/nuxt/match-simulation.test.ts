import { afterEach, describe, expect, it, vi } from 'vitest';
import { CUSTOM_TEAM_LIST } from '~/constants/teams/custom';
import { ENGLAND_TEAM_LIST } from '~/constants/teams/england';
import { getRandomScore, getSimulatedMatchScore } from '~/helpers/match-score';
import { simulateMatchScore } from '~/helpers/match-simulation';

vi.mock(import('~/helpers/match-score'), { spy: true });

describe('match-simulation', () => {
  afterEach(() => vi.clearAllMocks());

  describe('simulateMatchScore', () => {
    it('should call getSimulatedMatchScore when both teams have strength values', () => {
      simulateMatchScore(CUSTOM_TEAM_LIST[0]!.id, CUSTOM_TEAM_LIST[1]!.id);

      expect(getRandomScore).not.toHaveBeenCalled();
      expect(getSimulatedMatchScore).toHaveBeenCalled();
    });

    it('should call getRandomScore when at least one team does not have a strength value', () => {
      simulateMatchScore(ENGLAND_TEAM_LIST[0]!.id, ENGLAND_TEAM_LIST[1]!.id);

      expect(getRandomScore).toHaveBeenCalled();
      expect(getSimulatedMatchScore).not.toHaveBeenCalled();
    });
  });
});

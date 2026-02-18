import { describe, expect, it } from 'vitest';
import { generateInitialSchedule } from '../../app/helpers/match-schedule';

describe('match-schedule', () => {
  describe('generateInitialSchedule', () => {
    it('should throw error when teams array has odd number of elements', () => {
      const teams = [1, 2, 3, 4, 5];
      expect(() => generateInitialSchedule(teams)).toThrow();
    });

    it('should throw error when teams array has duplicate elements', () => {
      const teams = [1, 2, 3, 4, 6, 6];
      expect(() => generateInitialSchedule(teams)).toThrow();
    });

    it('should throw error when an avoid group has odd number of elements', () => {
      const teams = [1, 2, 3, 4];
      const avoidGroups = [[1, 2, 3]];
      expect(() => generateInitialSchedule(teams, avoidGroups)).toThrow();
    });

    it('should throw error when avoid groups contain different number of elements', () => {
      const teams = [1, 2, 3, 4];
      const avoidGroups = [[1, 2], [3, 4, 5, 6]];
      expect(() => generateInitialSchedule(teams, avoidGroups)).toThrow();
    });

    it('should throw error when teams and avoidGroups do not have exact same elements', () => {
      const teams = [1, 2, 3, 4];
      const avoidGroups = [[1, 2], [5, 6]];
      expect(() => generateInitialSchedule(teams, avoidGroups)).toThrow();
    });
  });
});

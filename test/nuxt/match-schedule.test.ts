import { describe, expect, it } from 'vitest';
import { generateInitialSchedule } from '@/helpers/match-schedule';
import { getMaxPossibleMatchweeksPerRoundRobin } from '~/helpers/matchweek';

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

    it('should ensure no team plays against itself', () => {
      const teams = [1, 2, 3, 4];
      const schedule = generateInitialSchedule(teams);

      expect(schedule.every(week => week.every(match => match.homeTeam.id !== match.awayTeam.id))).toBeTruthy();
    });

    it('should ensure weeks do not have duplicate teams', () => {
      const teams = [1, 2, 3, 4];
      const schedule = generateInitialSchedule(teams);

      schedule.forEach((week) => {
        const weekTeams = week.flatMap(match => [match.homeTeam.id, match.awayTeam.id]);

        expect(new Set(weekTeams).size).toBe(weekTeams.length);
      });
    });

    it('should ensure a schedule with no avoidGroups has the correct number of weeks', () => {
      const teams1 = createArray(4, index => index);
      const teams2 = createArray(8, index => index);
      const teams3 = createArray(20, index => index);

      expect(generateInitialSchedule(teams1).length).toBe(getMaxPossibleMatchweeksPerRoundRobin(teams1.length));
      expect(generateInitialSchedule(teams2).length).toBe(getMaxPossibleMatchweeksPerRoundRobin(teams2.length));
      expect(generateInitialSchedule(teams3).length).toBe(getMaxPossibleMatchweeksPerRoundRobin(teams3.length));
    });

    it('should ensure a schedule with no avoidGroups has each team playing in every week', () => {
      const teams = [1, 2, 3, 4];
      const schedule = generateInitialSchedule(teams);

      schedule.forEach((week) => {
        const weekTeams = week.flatMap(match => [match.homeTeam.id, match.awayTeam.id]);

        expect(weekTeams.sort().join()).toBe(teams.sort().join());
      });
    });
  });
});

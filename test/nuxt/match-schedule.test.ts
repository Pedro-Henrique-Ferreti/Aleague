import { describe, expect, it } from 'vitest';
import { addRoundRobins, balanceScheduleWeeks, createMatchSchedule, generateInitialSchedule, MAX_EXECUTION_TIME } from '@/helpers/match-schedule';
import { getExpectedMatchweeksPerRoundRobin, getMaxPossibleMatchweeksPerRoundRobin } from '~/helpers/matchweek';

const unbalanceableSchedule = {
  teams: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  avoidGroups: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]],
};

const EXECUTION_TIME = MAX_EXECUTION_TIME + 1000;

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

  describe('balanceScheduleWeeks', () => {
    it('should ensure all weeks have the same number of matches', async () => {
      const teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const avoidGroups = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
      const schedule = generateInitialSchedule(teams, avoidGroups);
      const { schedule: balancedSchedule } = await balanceScheduleWeeks(schedule, teams.length, avoidGroups[0]!.length);
      const expectedWeeks = getExpectedMatchweeksPerRoundRobin(teams.length, avoidGroups[0]!.length);

      expect(balancedSchedule.length === expectedWeeks).toBeTruthy();
    });

    it('should not run indefinitely if weeks cannot be balanced', async () => {
      const teamsCount = unbalanceableSchedule.teams.length;
      const avoidGroupCount = unbalanceableSchedule.avoidGroups[0]!.length;
      const schedule = generateInitialSchedule(unbalanceableSchedule.teams, unbalanceableSchedule.avoidGroups);

      const startTime = Date.now();
      await balanceScheduleWeeks(schedule, teamsCount, avoidGroupCount);
      const elapsedTime = Date.now() - startTime;

      expect(elapsedTime).toBeCloseTo(MAX_EXECUTION_TIME, -2);
    });
  }, EXECUTION_TIME);

  describe('addRoundRobins', () => {
    it('should add the correct number of round robins', () => {
      const schedule = generateInitialSchedule([1, 2, 3, 4]);

      expect(addRoundRobins(schedule).length).toBe(3);
      expect(addRoundRobins(schedule, 2).length).toBe(6);
      expect(addRoundRobins(schedule, 3).length).toBe(9);
    });
  });

  describe('createMatchSchedule', () => {
    it('should cap the number of weeks to the number provided', async () => {
      const teams = [1, 2, 3, 4];
      const { schedule } = await createMatchSchedule({ teams, weeksToCreate: 2 });

      expect(schedule.length).toBe(2);
    });
  });

  it('should not cap the number of weeks if the schedule is not balanceable', async () => {
    const { schedule } = await createMatchSchedule({
      teams: unbalanceableSchedule.teams,
      avoidGroups: unbalanceableSchedule.avoidGroups,
      weeksToCreate: 2,
    });

    expect(schedule.length).toBeGreaterThan(2);
  }, EXECUTION_TIME);
});

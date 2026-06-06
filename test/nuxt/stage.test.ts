import { describe, expect, it } from 'vitest';
import { newGroupStage, newGroupStageMatchweekList, newPlayoffStage } from '~/helpers/stage';

describe('stage', () => {
  describe('newPlayoffStage', () => {
    it('should create correct number of rounds', () => {
      const baseStage: BaseStage = { id: 1, name: 'Playoffs', sequence: 1, type: StageType.PLAYOFF };
      const stageForm: StageForm = {
        name: 'Playoffs', type: StageType.PLAYOFF, teams: 8, teamsPerGroup: 0, groups: 0, playoffRounds: 3,
      };

      const result = newPlayoffStage(stageForm, baseStage);

      expect(result.rounds).toHaveLength(3);
    });

    it('should create correct number of slots per round', () => {
      const baseStage: BaseStage = { id: 1, name: 'Playoffs', sequence: 1, type: StageType.PLAYOFF };
      const stageForm: StageForm = {
        name: 'Playoffs', type: StageType.PLAYOFF, teams: 8, teamsPerGroup: 0, groups: 0, playoffRounds: 3,
      };

      const result = newPlayoffStage(stageForm, baseStage);

      expect(result.rounds[0]?.slots).toHaveLength(4);
      expect(result.rounds[1]?.slots).toHaveLength(2);
      expect(result.rounds[2]?.slots).toHaveLength(1);
    });
  });

  describe('newGroupStage', () => {
    it('should create correct number of groups', () => {
      const baseStage: BaseStage = { id: 1, name: 'Group Stage', sequence: 1, type: StageType.GROUP };
      const stageForm: StageForm = {
        name: 'Group Stage', type: StageType.GROUP, teams: 12, teamsPerGroup: 4, groups: 3, playoffRounds: 0,
      };

      const result = newGroupStage(stageForm, baseStage);

      expect(result.groups).toHaveLength(3);
      expect(result.groups[0]?.order).toBe(1);
      expect(result.groups[1]?.order).toBe(2);
      expect(result.groups[2]?.order).toBe(3);
    });

    it('should create standings entries for each team per group', () => {
      const baseStage: BaseStage = { id: 1, name: 'Group Stage', sequence: 1, type: StageType.GROUP };
      const stageForm: StageForm = {
        name: 'Group Stage', type: StageType.GROUP, teams: 8, teamsPerGroup: 4, groups: 2, playoffRounds: 0,
      };

      const result = newGroupStage(stageForm, baseStage);

      expect(result.groups[0]?.standings).toHaveLength(4);
      expect(result.groups[1]?.standings).toHaveLength(4);
      result.groups.forEach(group => group.standings.forEach(entry => expect(entry.team).toBeNull()));
    });

    it('should include overallQualifier when there are multiple groups', () => {
      const baseStage: BaseStage = { id: 1, name: 'Group Stage', sequence: 1, type: StageType.GROUP };
      const stageForm: StageForm = {
        name: 'Group Stage', type: StageType.GROUP, teams: 8, teamsPerGroup: 4, groups: 2, playoffRounds: 0,
      };

      const result = newGroupStage(stageForm, baseStage);

      expect(result.overallQualifier).toHaveLength(8);
    });

    it('should omit overallQualifier when there is a single group', () => {
      const baseStage: BaseStage = { id: 1, name: 'Group Stage', sequence: 1, type: StageType.GROUP };
      const stageForm: StageForm = {
        name: 'Group Stage', type: StageType.GROUP, teams: 4, teamsPerGroup: 4, groups: 1, playoffRounds: 0,
      };

      const result = newGroupStage(stageForm, baseStage);

      expect(result.overallQualifier).toEqual([]);
    });
  });

  describe('newGroupStageMatchweekList', () => {
    it('should throw when groups are not fully completed', async () => {
      const groups = [{
        order: 1,
        standings: [
          { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          { id: '2', team: null, data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
        ] as StandingsEntry[],
        qualifier: [Qualifier.NONE, Qualifier.NONE],
      }];

      await expect(newGroupStageMatchweekList({
        groups,
        format: GroupStageFormat.ALL_PLAY_ALL,
        roundRobins: 1,
      })).rejects.toThrow('All teams must be assigned');
    });
  });
});

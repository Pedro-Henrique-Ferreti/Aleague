import { describe, expect, it } from 'vitest';
import { getGroupName, getGroupStageWinner, getGroupTeamsAndAvoidGroups, getSameGroupTeamLists, isGroupStageComplete, isGroupStageSeeded } from '~/helpers/group-stage';
import { newMatch } from '~/helpers/match';
import { newStandingsEntry } from '~/helpers/standings';

describe('group-stage', () => {
  describe('getSameGroupTeamLists', () => {
    it('should return team lists for each group', () => {
      const groups = [
        {
          order: 1,
          standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
        {
          order: 2,
          standings: [newStandingsEntry('3', 'team-c'), newStandingsEntry('4', 'team-d')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
      ] as GroupStage['groups'];

      const result = getSameGroupTeamLists(groups);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(['team-a', 'team-b']);
      expect(result[1]).toEqual(['team-c', 'team-d']);
    });
  });

  describe('getGroupTeamsAndAvoidGroups', () => {
    it('should return avoidGroups for OTHER_GROUPS_ROUND_ROBIN format', () => {
      const groups = [
        {
          order: 1,
          standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
      ] as GroupStage['groups'];

      const result = getGroupTeamsAndAvoidGroups(groups, GroupStageFormat.OTHER_GROUPS_ROUND_ROBIN);

      expect(result.teams).toEqual(['team-a', 'team-b']);
      expect(result.avoidGroups).toEqual([['team-a', 'team-b']]);
    });

    it('should return undefined avoidGroups for non-OTHER_GROUPS_ROUND_ROBIN formats', () => {
      const groups = [
        {
          order: 1,
          standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
      ] as GroupStage['groups'];

      const result = getGroupTeamsAndAvoidGroups(groups, GroupStageFormat.ALL_PLAY_ALL);
      const result2 = getGroupTeamsAndAvoidGroups(groups, GroupStageFormat.SAME_GROUP_ROUND_ROBIN);

      expect(result.avoidGroups).toBeUndefined();
      expect(result2.avoidGroups).toBeUndefined();
    });
  });

  describe('isGroupStageSeeded', () => {
    it('should return true when all teams are assigned', () => {
      const groups = [
        {
          order: 1,
          standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
      ] as GroupStage['groups'];

      expect(isGroupStageSeeded(groups)).toBe(true);
    });

    it('should return false when any team is not assigned', () => {
      const groups = [
        {
          order: 1,
          standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        },
      ] as GroupStage['groups'];

      expect(isGroupStageSeeded(groups)).toBe(false);
    });
  });

  describe('getGroupName', () => {
    it('should return group name in number format', () => {
      const name = getGroupName(1, GroupStageNameFormat.NUMBER);
      expect(name).toBe('Grupo 1');
    });

    it('should return group name in letter format', () => {
      const name = getGroupName(1, GroupStageNameFormat.LETTER);
      expect(name).toBe('Grupo A');
    });

    it('should return group name in letter format with count for orders greater than alphabet length', () => {
      const name = getGroupName(27, GroupStageNameFormat.LETTER);
      expect(name).toBe('Grupo A2');
    });
  });

  describe('isGroupStageComplete', () => {
    it('should return true when all groups are seeded and all matchweeks are complete', () => {
      const match = newMatch('team-a', 'team-b');
      match.homeTeam.score = 2;
      match.awayTeam.score = 1;

      const stage = {
        groups: [{ standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')] }],
        matchweeks: [{ week: 1, matches: [match] }],
      } as GroupStage;

      expect(isGroupStageComplete(stage)).toBe(true);
    });

    it('should return false when any group is not seeded', () => {
      const match = newMatch('team-a', 'team-b');
      match.homeTeam.score = 2;
      match.awayTeam.score = 1;

      const stage = {
        groups: [
          { standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2')] },
          { standings: [] },
        ],
        matchweeks: [{ week: 1, matches: [match] }],
      } as GroupStage;

      expect(isGroupStageComplete(stage)).toBe(false);
    });

    it('should return false when any match is not complete', () => {
      const stage = {
        groups: [{ standings: [newStandingsEntry('1', 'team-a'), newStandingsEntry('2', 'team-b')] }],
        matchweeks: [{ week: 1, matches: [newMatch('team-a', 'team-b')] }],
      } as GroupStage;

      expect(isGroupStageComplete(stage)).toBe(false);
    });
  });

  describe('getGroupStageWinner', () => {
    it('should return null when the stage has more than one group', () => {
      const stage = {
        groups: [
          { standings: [newStandingsEntry('1', 'BRA-1')] },
          { standings: [newStandingsEntry('2', 'BRA-2')] },
        ],
      } as GroupStage;

      expect(getGroupStageWinner(stage)).toBeNull();
    });

    it('should return null when the stage is not complete', () => {
      const stage = {
        groups: [{ standings: [newStandingsEntry('1', 'BRA-1'), newStandingsEntry('2', 'BRA-2')] }],
        matchweeks: [{ week: 1, matches: [newMatch('BRA-1', 'BRA-2')] }],
      } as GroupStage;

      expect(getGroupStageWinner(stage)).toBeNull();
    });

    it('should return the leading team when the stage is complete', () => {
      const id = DETAILED_TEAM_LIST[0]!.id;
      const leader = newStandingsEntry('1', id);
      leader.data[0].points = 3;

      const match = newMatch(id, 'BRA-2');
      match.homeTeam.score = 1;
      match.awayTeam.score = 0;

      const stage = {
        groups: [{ standings: [leader, newStandingsEntry('2', 'BRA-2')] }],
        matchweeks: [{ week: 1, matches: [match] }],
      } as GroupStage;

      const winner = getGroupStageWinner(stage);

      expect(winner!.id).toBe(id);
    });
  });
});

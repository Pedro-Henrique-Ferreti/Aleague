import { describe, expect, it } from 'vitest';
import { getGroupTeamsAndAvoidGroups, getSameGroupTeamLists, groupsAreFullyCompleted } from '~/helpers/group-stage';

describe('group-stage', () => {
  describe('getSameGroupTeamLists', () => {
    it('should return team lists for each group', () => {
      const groups = [
        {
          order: 1,
          standings: [
            { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '2', team: 'team-b', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
        },
        {
          order: 2,
          standings: [
            { id: '3', team: 'team-c', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '4', team: 'team-d', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
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
          standings: [
            { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '2', team: 'team-b', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
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
          standings: [
            { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '2', team: 'team-b', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
        },
      ] as GroupStage['groups'];

      const result = getGroupTeamsAndAvoidGroups(groups, GroupStageFormat.ALL_PLAY_ALL);
      const result2 = getGroupTeamsAndAvoidGroups(groups, GroupStageFormat.SAME_GROUP_ROUND_ROBIN);

      expect(result.avoidGroups).toBeUndefined();
      expect(result2.avoidGroups).toBeUndefined();
    });
  });

  describe('groupsAreFullyCompleted', () => {
    it('should return true when all teams are assigned', () => {
      const groups = [
        {
          order: 1,
          standings: [
            { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '2', team: 'team-b', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
        },
      ] as GroupStage['groups'];

      expect(groupsAreFullyCompleted(groups)).toBeTruthy();
    });

    it('should return false when any team is not assigned', () => {
      const groups = [
        {
          order: 1,
          standings: [
            { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: '2', team: null, data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
        },
      ] as GroupStage['groups'];

      expect(groupsAreFullyCompleted(groups)).toBeFalsy();
    });
  });
});

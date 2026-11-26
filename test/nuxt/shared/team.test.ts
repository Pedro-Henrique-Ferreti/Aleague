import { describe, expect, it } from 'vitest';
import { TEAM_LIST } from '~/features/teams/constants/team';

describe('team utils', () => {
  describe('getTeamById', () => {
    it('returns the team with id', () => {
      const team = getRandomItem(TEAM_LIST);
      expect(getTeamById(team?.id)).toBe(team);
    });

    it.each([undefined, null, '', 'fake-team-id'])('returns undefined for %j', (id) => {
      expect(getTeamById(id)).toBeUndefined();
    });

    it('has no duplicated team ids in the team list', () => {
      expect(new Set(TEAM_LIST.map(team => team.id)).size).toBe(TEAM_LIST.length);
    });
  });
});

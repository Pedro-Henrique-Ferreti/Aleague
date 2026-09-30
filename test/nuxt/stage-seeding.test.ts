import { describe, expect, it } from 'vitest';
import { newGroupStage, newPlayoffStage } from '~/helpers/stage';
import { getTeamSeedingGroups } from '~/helpers/stage-seeding';

describe('stage-seeding', () => {
  describe('getTeamSeedingGroups', () => {
    it('should get seeding groups from a group stage', () => {
      const stage = newGroupStage({
        name: 'Group Stage',
        type: StageType.GROUP,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 8,
        teamsPerGroup: 4,
        groups: 2,
        playoffRounds: 0,
      }, {
        id: 1,
        name: 'Group Stage',
        sequence: 1,
        type: StageType.GROUP,
      });

      const groups = getTeamSeedingGroups(stage);

      expect(groups).toHaveLength(2);

      groups.forEach((group) => {
        expect(group.teams).toHaveLength(4);
      });
    });

    it('should get seeding groups from a playoff round', () => {
      const stage = newPlayoffStage({
        name: 'Playoffs',
        type: StageType.PLAYOFF,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 8,
        teamsPerGroup: 0,
        groups: 0,
        playoffRounds: 3,
      }, {
        id: 1,
        name: 'Playoffs',
        sequence: 1,
        type: StageType.PLAYOFF,
      });

      const groups = getTeamSeedingGroups(stage.rounds[0]);

      expect(groups).toHaveLength(4);

      groups.forEach((group) => {
        expect(group.teams).toHaveLength(2);
      });
    });
  });
});

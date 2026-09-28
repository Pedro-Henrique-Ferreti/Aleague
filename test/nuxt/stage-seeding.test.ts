import { describe, expect, it } from 'vitest';
import { newGroupStage, newPlayoffStage } from '~/helpers/stage';
import { newStageSeedingForm } from '~/helpers/stage-seeding';

describe('stage-seeding', () => {
  describe('newStageSeedingForm', () => {
    it('should create a new form from a group stage', () => {
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

      const form = newStageSeedingForm(stage);

      expect(form.groups).toHaveLength(2);
    });

    it('should create a new form from a playoff stage', () => {
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

      const form = newStageSeedingForm(stage);

      expect(form.groups).toHaveLength(4);
    });
  });
});

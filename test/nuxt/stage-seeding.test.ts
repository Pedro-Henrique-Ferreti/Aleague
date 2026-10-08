import { describe, expect, it } from 'vitest';
import { newGroupStage } from '~/helpers/group-stage';
import { newPlayoffRoundSlot } from '~/helpers/playoff-slot';
import { newPlayoffStage } from '~/helpers/playoff-stage';
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

      for (const group of groups) {
        expect(group.teams).toHaveLength(4);
      }
    });

    it('should get seeding groups from the first round of a playoff stage', () => {
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

      const groups = getTeamSeedingGroups(stage);

      expect(groups).toHaveLength(4);

      for (const group of groups) {
        expect(group.teams).toHaveLength(2);
      }
    });

    it('should get seeding groups from a playoff round', () => {
      const groups = getTeamSeedingGroups({
        id: 'round-1',
        name: 'Round 1',
        order: 1,
        slots: [newPlayoffRoundSlot(0)],
      } satisfies PlayoffRound);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.teams).toHaveLength(2);
    });

    it('should get seeded groups when resetSeeding is false', () => {
      const round: PlayoffRound = {
        id: 'round-1',
        name: 'Round 1',
        order: 1,
        slots: [newPlayoffRoundSlot(0)],
      };

      round.slots[0]!.legs[0].homeTeam.id = 'home-id';
      round.slots[0]!.legs[0].awayTeam.id = 'away-id';

      const groups = getTeamSeedingGroups(round);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.teams).toEqual(['home-id', 'away-id']);
    });

    it('should get reset seeding groups when resetSeeding is true', () => {
      const round: PlayoffRound = {
        id: 'round-1',
        name: 'Round 1',
        order: 1,
        slots: [newPlayoffRoundSlot(0)],
      };

      round.slots[0]!.legs[0].homeTeam.id = 'home-id';
      round.slots[0]!.legs[0].awayTeam.id = 'away-id';

      const groups = getTeamSeedingGroups(round, true);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.teams).toEqual([null, null]);
    });
  });
});

import { describe, expect, it } from 'vitest';
import { newTournamentStage } from '~/helpers/tournament';

describe('tournament', () => {
  describe('newTournamentStage', () => {
    it('should create a group stage when type is GROUP', () => {
      const result = newTournamentStage({
        name: 'Group Stage',
        type: StageType.GROUP,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 8,
        teamsPerGroup: 4,
        groups: 2,
        playoffRounds: 0,
      });

      expect(result.type).toBe(StageType.GROUP);
      expect('groups' in result).toBeTruthy();
      expect('matchweeks' in result).toBeTruthy();
    });

    it('should create a playoff stage when type is PLAYOFF', () => {
      const result = newTournamentStage({
        name: 'Playoffs',
        type: StageType.PLAYOFF,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 8,
        teamsPerGroup: 0,
        groups: 0,
        playoffRounds: 3,
      });

      expect(result.type).toBe(StageType.PLAYOFF);
      expect('rounds' in result).toBeTruthy();
    });

    it('should increment sequence based on existing stages', () => {
      const form: StageForm = {
        name: 'Stage 2',
        type: StageType.GROUP,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 4,
        teamsPerGroup: 4,
        groups: 1,
        playoffRounds: 0,
      };

      const existingStages = [
        {
          id: 100,
          sequence: 1,
          name: 'Stage 1',
          type: StageType.GROUP,
          nameFormat: GroupStageNameFormat.NUMBER,
          groups: [],
          overallLegend: [],
          matchweeks: [],
        },
      ] as TournamentStage[];

      const result = newTournamentStage(form, existingStages);

      expect(result.sequence).toBe(2);
    });

    it('should default sequence to 1 when no stages exist', () => {
      const result = newTournamentStage({
        name: 'First Stage',
        type: StageType.GROUP,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        teams: 4,
        teamsPerGroup: 4,
        groups: 1,
        playoffRounds: 0,
      });

      expect(result.sequence).toBe(1);
    });
  });
});

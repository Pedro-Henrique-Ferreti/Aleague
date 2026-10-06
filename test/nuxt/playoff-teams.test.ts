import { describe, expect, it } from 'vitest';
import { newMatch } from '~/helpers/match';
import { replacePlayoffRoundTeams } from '~/helpers/playoff-teams';
import { newTournamentStage } from '~/helpers/tournament';

function mockStageSeedingForm(...groupTeams: string[][]): StageSeedingForm {
  return {
    groups: groupTeams.map((teams, index) => ({
      name: '',
      order: index + 1,
      teams,
    })),
  };
}

describe('playoff-teams', () => {
  describe('replacePlayoffRoundTeams', () => {
    it('should assign teams to the first round slots', () => {
      const playoffStage = newTournamentStage({
        name: 'Playoffs',
        type: StageType.PLAYOFF,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        groups: 0,
        playoffRounds: 2,
        teams: 4,
        teamsPerGroup: 0,
      }) as PlayoffStage;

      replacePlayoffRoundTeams(playoffStage, mockStageSeedingForm(['team-a', 'team-b'], ['team-c', 'team-d']));

      expect(playoffStage.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[1]!.legs[0].homeTeam.id).toBe('team-c');
      expect(playoffStage.rounds[0].slots[1]!.legs[0].awayTeam.id).toBe('team-d');
    });

    it('should alternate home and away across legs', () => {
      const playoffStage: PlayoffStage = {
        id: 1,
        name: 'Playoffs',
        sequence: 1,
        type: StageType.PLAYOFF,
        rounds: [{
          id: 'r1',
          order: 0,
          name: 'Semifinal',
          slots: [{
            id: 's1',
            order: 0,
            legs: [newMatch(), newMatch()],
          }],
        }],
      };

      replacePlayoffRoundTeams(playoffStage, mockStageSeedingForm(['team-a', 'team-b']));

      expect(playoffStage.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[0]!.legs[1]!.homeTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[0]!.legs[1]!.awayTeam.id).toBe('team-a');
    });
  });
});

import { describe, expect, it } from 'vitest';
import { newLegendDescription } from '~/helpers/group-stage';
import { newMatch } from '~/helpers/match';
import { updateGroupStageTeams, updatePlayoffStageTeams } from '~/helpers/stage-teams';
import { newStandingsEntry } from '~/helpers/standings';
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

describe('stage-teams', () => {
  describe('updatePlayoffStageTeams', () => {
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

      const result = updatePlayoffStageTeams(playoffStage, mockStageSeedingForm(['team-a', 'team-b'], ['team-c', 'team-d']));

      expect(result.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(result.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(result.rounds[0].slots[1]!.legs[0].homeTeam.id).toBe('team-c');
      expect(result.rounds[0].slots[1]!.legs[0].awayTeam.id).toBe('team-d');
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

      const result = updatePlayoffStageTeams(playoffStage, mockStageSeedingForm(['team-a', 'team-b']));

      expect(result.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(result.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(result.rounds[0].slots[0]!.legs[1]!.homeTeam.id).toBe('team-b');
      expect(result.rounds[0].slots[0]!.legs[1]!.awayTeam.id).toBe('team-a');
    });
  });

  describe('updateGroupStageTeams', () => {
    it('should assign teams to the group standings', () => {
      const groupStage = newTournamentStage({
        name: 'Group',
        type: StageType.GROUP,
        groupNameFormat: GroupStageNameFormat.NUMBER,
        groups: 1,
        playoffRounds: 0,
        teams: 2,
        teamsPerGroup: 2,
      }) as GroupStage;

      const result = updateGroupStageTeams(groupStage, mockStageSeedingForm(['team-a', 'team-b']));

      expect(result.groups[0]!.standings[0]!.team).toBe('team-a');
      expect(result.groups[0]!.standings[1]!.team).toBe('team-b');
    });

    it('should replace teams in matchweeks when teams are reassigned', () => {
      const groupStage: GroupStage = {
        id: 1,
        name: 'Group',
        sequence: 1,
        type: StageType.GROUP,
        nameFormat: GroupStageNameFormat.NUMBER,
        matchweeks: [{
          week: 1,
          matches: [newMatch('old-a', 'old-b')],
        }],
        groups: [{
          order: 1,
          standings: [newStandingsEntry('s1', 'old-a'), newStandingsEntry('s2', 'old-b')],
          legend: [LegendColor.NONE, LegendColor.NONE],
        }],
        legendDescription: newLegendDescription(),
        overallLegend: [],
      };

      const result = updateGroupStageTeams(groupStage, mockStageSeedingForm(['team-a', 'team-b']));

      expect(result.matchweeks[0]!.matches[0]!.homeTeam.id).toBe('team-a');
      expect(result.matchweeks[0]!.matches[0]!.awayTeam.id).toBe('team-b');
    });
  });
});

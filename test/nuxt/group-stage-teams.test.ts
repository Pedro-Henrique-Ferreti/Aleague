import { describe, expect, it } from 'vitest';
import { newLegendDescription } from '~/helpers/group-stage';
import { replaceGroupStageTeams } from '~/helpers/group-stage-teams';
import { newMatch } from '~/helpers/match';
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

describe('group-stage-teams', () => {
  describe('replaceGroupStageTeams', () => {
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

      const result = replaceGroupStageTeams(groupStage, mockStageSeedingForm(['team-a', 'team-b']));

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

      const result = replaceGroupStageTeams(groupStage, mockStageSeedingForm(['team-a', 'team-b']));

      expect(result.matchweeks[0]!.matches[0]!.homeTeam.id).toBe('team-a');
      expect(result.matchweeks[0]!.matches[0]!.awayTeam.id).toBe('team-b');
    });
  });
});

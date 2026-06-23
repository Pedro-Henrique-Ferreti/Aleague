import { describe, expect, it } from 'vitest';
import { updateGroupStageTeams, updatePlayoffStageTeams } from '~/helpers/stage-teams';
import { newTournamentStage } from '~/helpers/tournament';

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

      const form: StageTeamsForm = {
        groups: [
          { order: 0, teams: ['team-a', 'team-b'] },
          { order: 1, teams: ['team-c', 'team-d'] },
        ],
      };

      const result = updatePlayoffStageTeams(playoffStage, form);

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
            legs: [
              { id: 'm1', homeTeam: { id: null, score: null }, awayTeam: { id: null, score: null }, kickoff: null },
              { id: 'm2', homeTeam: { id: null, score: null }, awayTeam: { id: null, score: null }, kickoff: null },
            ],
          }],
        }],
      };

      const form: StageTeamsForm = {
        groups: [
          { order: 0, teams: ['team-a', 'team-b'] },
        ],
      };

      const result = updatePlayoffStageTeams(playoffStage, form);

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

      const form: StageTeamsForm = {
        groups: [
          { order: 1, teams: ['team-a', 'team-b'] },
        ],
      };

      const result = updateGroupStageTeams(groupStage, form);

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
          matches: [
            { id: 'm1', homeTeam: { id: 'old-a', score: null }, awayTeam: { id: 'old-b', score: null }, kickoff: null },
          ],
        }],
        groups: [{
          order: 1,
          standings: [
            { id: 's1', team: 'old-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
            { id: 's2', team: 'old-b', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          ] as StandingsEntry[],
          qualifier: [Qualifier.NONE, Qualifier.NONE],
        }],
        overallQualifier: [],
      };

      const form: StageTeamsForm = {
        groups: [
          { order: 1, teams: ['team-a', 'team-b'] },
        ],
      };

      const result = updateGroupStageTeams(groupStage, form);

      expect(result.matchweeks[0]!.matches[0]!.homeTeam.id).toBe('team-a');
      expect(result.matchweeks[0]!.matches[0]!.awayTeam.id).toBe('team-b');
    });
  });
});

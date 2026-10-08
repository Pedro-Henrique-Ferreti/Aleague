import { describe, expect, it } from 'vitest';
import { getNextRound, moveTeamToNextRound, replacePlayoffRoundTeams } from '~/helpers/playoff-round';
import { addSecondLegToSlot } from '~/helpers/playoff-slot';
import { newStageSeedingForm } from '~/helpers/stage-seeding';
import { mockPlayoffStage } from './mocks';

describe('playoff-round', () => {
  describe('getNextRound', () => {
    it('should return the next round in the stage', () => {
      const playoffStage = mockPlayoffStage();
      const nextRound = getNextRound(playoffStage, playoffStage.rounds[0]);

      expect(nextRound).toBe(playoffStage.rounds[1]);
    });

    it('should return undefined when there is no next round in the stage', () => {
      const playoffStage = mockPlayoffStage();
      const nextRound = getNextRound(playoffStage, playoffStage.rounds[1]!);

      expect(nextRound).toBeUndefined();
    });
  });

  describe('replacePlayoffRoundTeams', () => {
    it('should assign teams to the first round slots', () => {
      const playoffStage = mockPlayoffStage();
      const seedingForm = newStageSeedingForm(playoffStage);

      seedingForm.groups[0]!.teams = ['team-a', 'team-b'];
      seedingForm.groups[1]!.teams = ['team-c', 'team-d'];

      replacePlayoffRoundTeams(playoffStage.rounds[0], seedingForm);

      expect(playoffStage.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[1]!.legs[0].homeTeam.id).toBe('team-c');
      expect(playoffStage.rounds[0].slots[1]!.legs[0].awayTeam.id).toBe('team-d');
    });

    it('should alternate home and away across legs', () => {
      const playoffStage = mockPlayoffStage();
      const seedingForm = newStageSeedingForm(playoffStage);

      seedingForm.groups[0]!.teams = ['team-a', 'team-b'];

      addSecondLegToSlot(playoffStage.rounds[0].slots[0]!);

      replacePlayoffRoundTeams(playoffStage.rounds[0], seedingForm);

      expect(playoffStage.rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[0].slots[0]!.legs[0].awayTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[0]!.legs[1]!.homeTeam.id).toBe('team-b');
      expect(playoffStage.rounds[0].slots[0]!.legs[1]!.awayTeam.id).toBe('team-a');
    });
  });

  describe('moveTeamToNextRound', () => {
    it('should move a team to the next round', () => {
      const playoffStage = mockPlayoffStage();

      addSecondLegToSlot(playoffStage.rounds[1]!.slots[0]!);

      playoffStage.rounds[1]!.slots[0]!.legs[0].awayTeam.id = 'team-b';

      moveTeamToNextRound(playoffStage, { newWinner: 'team-a', oldWinner: null, slotIndex: 0, round: playoffStage.rounds[0] });

      expect(playoffStage.rounds[1]!.slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[1]!.slots[0]!.legs[1]!.awayTeam.id).toBe('team-a');
    });

    it('should search and replace a team in the next round', () => {
      const playoffStage = mockPlayoffStage();

      playoffStage.rounds[1]!.slots[0]!.legs[0].awayTeam.id = 'team-b';

      moveTeamToNextRound(playoffStage, { newWinner: 'team-a', oldWinner: 'team-b', slotIndex: 0, round: playoffStage.rounds[0] });

      expect(playoffStage.rounds[1]!.slots[0]!.legs[0].awayTeam.id).toBe('team-a');
    });
  });
});

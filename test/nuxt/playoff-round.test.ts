import { describe, expect, it } from 'vitest';
import { getNextRound, isNextRound, isPlayoffRoundSeeded, moveTeamToNextRound, reorderPlayoffRoundSlots, replacePlayoffRoundTeams } from '~/helpers/playoff-round';
import { addSecondLegToSlot, replaceSlotTeams } from '~/helpers/playoff-slot';
import { newStageSeedingForm } from '~/helpers/stage-seeding';
import { mockPlayoffStage } from './mocks';

describe('playoff-round', () => {
  describe('isPlayoffRoundSeeded', () => {
    it('should return true for a seeded round', () => {
      const seededRound = {
        slots: [{
          legs: [{ homeTeam: { id: 'team-a', score: null }, awayTeam: { id: 'team-b', score: null } }] as PlayoffRoundSlot['legs'],
        }] as PlayoffRoundSlot[],
      } as PlayoffRound;

      expect(isPlayoffRoundSeeded(seededRound)).toBe(true);
    });

    it('should return false for an unseeded round', () => {
      const unseededRound = {
        slots: [{
          legs: [{ homeTeam: { id: null, score: null }, awayTeam: { id: null, score: null } }] as PlayoffRoundSlot['legs'],
        }] as PlayoffRoundSlot[],
      } as PlayoffRound;

      expect(isPlayoffRoundSeeded(unseededRound)).toBe(false);
    });
  });

  describe('isNextRound', () => {
    it('should return true for the next round', () => {
      const playoffStage = mockPlayoffStage();

      expect(isNextRound(playoffStage.rounds[1]!, playoffStage.rounds[0])).toBe(true);
      expect(isNextRound(playoffStage.rounds[0], playoffStage.rounds[1]!)).toBe(false);
    });
  });

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

  describe('reorderPlayoffRoundSlots', () => {
    it('should reorder the round slots', () => {
      const { rounds } = mockPlayoffStage({
        playoffRounds: 3,
        teams: 8,
      });

      // Seed first round (1-2 / 3-4 / 5-6 / 7-8)
      replaceSlotTeams(rounds[0].slots[0]!, { home: 'team-1', away: 'team-2' });
      replaceSlotTeams(rounds[0].slots[1]!, { home: 'team-3', away: 'team-4' });
      replaceSlotTeams(rounds[0].slots[2]!, { home: 'team-5', away: 'team-6' });
      replaceSlotTeams(rounds[0].slots[3]!, { home: 'team-7', away: 'team-8' });
      // Seed second round (1-3 / 5-7)
      replaceSlotTeams(rounds[1]!.slots[0]!, { home: 'team-1', away: 'team-3' });
      replaceSlotTeams(rounds[1]!.slots[1]!, { home: 'team-5', away: 'team-7' });
      // Shuffle second round
      replaceSlotTeams(rounds[1]!.slots[0]!, { home: 'team-5', away: 'team-3' });
      replaceSlotTeams(rounds[1]!.slots[1]!, { home: 'team-1', away: 'team-7' });

      reorderPlayoffRoundSlots(rounds[0]!, rounds[1]!);

      // Expected order (5-6 / 3-4 / 1-2 / 7-8) -> (5-3 / 1 - 7)
      expect(rounds[0].slots[0]!.legs[0].homeTeam.id).toBe('team-5');
      expect(rounds[0].slots[1]!.legs[0].homeTeam.id).toBe('team-3');
      expect(rounds[0].slots[2]!.legs[0].homeTeam.id).toBe('team-1');
      expect(rounds[0].slots[3]!.legs[0].homeTeam.id).toBe('team-7');

      rounds[0].slots.forEach((slot, index) => {
        expect(slot.order).toBe(index + 1);
      });
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

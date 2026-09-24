import { describe, expect, it } from 'vitest';
import { DETAILED_TEAM_LIST } from '~/constants/teams';
import { addSecondLegToSlot, newPlayoffRoundSlot } from '~/helpers/playoff-slot';
import { getPlayoffRoundNames, getPlayoffStageWinner, isPlayoffStageSeeded, moveTeamToNextRound } from '~/helpers/playoff-stage';
import { newPlayoffStage } from '~/helpers/stage';

describe('playoff-stage', () => {
  describe('getPlayoffRoundNames', () => {
    it('should return named rounds for a full path playoff (teams = 2^rounds)', () => {
      const result = getPlayoffRoundNames(3, 8);

      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Quartas de Final');
      expect(result[1]).toBe('Semifinal');
      expect(result[2]).toBe('Final');
    });

    it('should return ordinal names when the path is not full', () => {
      const result = getPlayoffRoundNames(3, 12);

      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Primeira Fase');
      expect(result[1]).toBe('Segunda Fase');
      expect(result[2]).toBe('Terceira Fase');
    });

    it('should fall back to ordinal names when round count exceeds named constants', () => {
      const result = getPlayoffRoundNames(5, 32);

      expect(result).toHaveLength(5);
      expect(result[0]).toBe('Primeira Fase');
      expect(result[1]).toBe('Oitavas de Final');
      expect(result[2]).toBe('Quartas de Final');
      expect(result[3]).toBe('Semifinal');
      expect(result[4]).toBe('Final');
    });
  });

  describe('isPlayoffStageSeeded', () => {
    it('should return true for a seeded playoff stage', () => {
      const seededRounds = [
        {
          slots: [{
            legs: [{ homeTeam: { id: 'team-a', score: null }, awayTeam: { id: 'team-b', score: null } }] as PlayoffRoundSlot['legs'],
          }] as PlayoffRoundSlot[],
        } as PlayoffRound,
      ] as PlayoffStage['rounds'];

      expect(isPlayoffStageSeeded(seededRounds)).toBe(true);
    });

    it('should return false for an unseeded playoff stage', () => {
      const unseededRounds = [
        {
          slots: [{
            legs: [{ homeTeam: { id: null, score: null }, awayTeam: { id: null, score: null } }] as PlayoffRoundSlot['legs'],
          }] as PlayoffRoundSlot[],
        } as PlayoffRound,
      ] as PlayoffStage['rounds'];

      expect(isPlayoffStageSeeded(unseededRounds)).toBe(false);
    });
  });

  describe('getPlayoffStageWinner', () => {
    it('should return null when the last round has more than one slot', () => {
      const stage = {
        rounds: [{
          slots: [newPlayoffRoundSlot(0), newPlayoffRoundSlot(1)],
        }] as PlayoffRound[],
      } as PlayoffStage;

      expect(getPlayoffStageWinner(stage)).toBeNull();
    });

    it('should return null when the final slot is not complete', () => {
      const slot = newPlayoffRoundSlot(0);
      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';

      const stage = {
        rounds: [{ slots: [slot] }] as PlayoffRound[],
      } as PlayoffStage;

      expect(getPlayoffStageWinner(stage)).toBeNull();
    });

    it('should return null when the final match is a draw', () => {
      const slot = newPlayoffRoundSlot(0);
      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 1;

      const stage = {
        rounds: [{ slots: [slot] }] as PlayoffRound[],
      } as PlayoffStage;

      expect(getPlayoffStageWinner(stage)).toBeNull();
    });

    it('should return the winning team when the final slot is decided', () => {
      const slot = newPlayoffRoundSlot(0);
      const id = DETAILED_TEAM_LIST[0]!.id;

      slot.legs[0].homeTeam.id = id;
      slot.legs[0].awayTeam.id = 'BRA-2';
      slot.legs[0].homeTeam.score = 2;
      slot.legs[0].awayTeam.score = 1;

      const stage = {
        rounds: [{ slots: [slot] }] as PlayoffRound[],
      } as PlayoffStage;

      const winner = getPlayoffStageWinner(stage);

      expect(winner?.id).toBe(id);
    });
  });

  describe('moveTeamToNextRound', () => {
    it('should move a team to the next round', () => {
      const playoffStage = newPlayoffStage(
        {
          name: 'Test Stage',
          groups: 0,
          groupNameFormat: GroupStageNameFormat.NUMBER,
          playoffRounds: 2,
          teams: 4,
          teamsPerGroup: 0,
          type: StageType.PLAYOFF,
        },
        {
          id: 1,
          name: 'Test Stage',
          sequence: 1,
          type: StageType.PLAYOFF,
        },
      );
      addSecondLegToSlot(playoffStage.rounds[1]!.slots[0]!);

      playoffStage.rounds[0]!.slots[0]!.legs[0].homeTeam.id = 'team-a';

      moveTeamToNextRound(playoffStage, { winner: 'team-a', slotIndex: 0, roundIndex: 0 });

      expect(playoffStage.rounds[1]!.slots[0]!.legs[0].homeTeam.id).toBe('team-a');
      expect(playoffStage.rounds[1]!.slots[0]!.legs[1]!.awayTeam.id).toBe('team-a');
    });
  });
});

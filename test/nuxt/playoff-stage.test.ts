import { describe, expect, it } from 'vitest';
import { newMatch } from '~/helpers/match';
import { getPlayoffRoundNames, getPlayoffRoundSlotWinner, isPlayoffStageSeeded, newPlayoffRoundSlot } from '~/helpers/playoff-stage';

describe('playoff', () => {
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

  describe('newPlayoffRoundSlot', () => {
    it('should return a slot with correct order', () => {
      const result = newPlayoffRoundSlot(0);
      expect(result.order).toBe(0);
    });

    it('should return a slot with a single leg', () => {
      const result = newPlayoffRoundSlot(0);
      expect(result.legs).toHaveLength(1);
    });

    it('should return unique ids for different slots', () => {
      const slot1 = newPlayoffRoundSlot(0);
      const slot2 = newPlayoffRoundSlot(1);
      expect(slot1.id).not.toBe(slot2.id);
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

  describe('getPlayoffRoundSlotWinner', () => {
    it('should return null when a leg does not have home and away teams', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 2;

      expect(getPlayoffRoundSlotWinner(slot)).toBeNull();
    });

    it('should return null when a leg does not have home and away scores', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';

      expect(getPlayoffRoundSlotWinner(slot)).toBeNull();
    });

    it('should return the home team for a single-leg home win', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 0;

      expect(getPlayoffRoundSlotWinner(slot)).toBe('home-id');
    });

    it('should return the away team for a single-leg away win', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 0;
      slot.legs[0].awayTeam.score = 1;

      expect(getPlayoffRoundSlotWinner(slot)).toBe('away-id');
    });

    it('should return null for a single-leg draw', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 1;

      expect(getPlayoffRoundSlotWinner(slot)).toBeNull();
    });

    it('should return the first-leg home team when the aggregate favors the home team', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 1;

      slot.legs.push(newMatch('away-id', 'home-id'));

      slot.legs[1]!.homeTeam.score = 0;
      slot.legs[1]!.awayTeam.score = 1;

      expect(getPlayoffRoundSlotWinner(slot)).toBe('home-id');
    });

    it('should return the first-leg away team when the aggregate favors the away team', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 1;

      slot.legs.push(newMatch('away-id', 'home-id'));

      slot.legs[1]!.homeTeam.score = 1;
      slot.legs[1]!.awayTeam.score = 0;

      expect(getPlayoffRoundSlotWinner(slot)).toBe('away-id');
    });

    it('should return null when the aggregate is a draw across two legs', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs[0].homeTeam.score = 1;
      slot.legs[0].awayTeam.score = 1;

      slot.legs.push(newMatch('away-id', 'home-id'));

      slot.legs[1]!.homeTeam.score = 0;
      slot.legs[1]!.awayTeam.score = 0;

      expect(getPlayoffRoundSlotWinner(slot)).toBeNull();
    });
  });
});

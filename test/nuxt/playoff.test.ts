import { describe, expect, it } from 'vitest';
import { getPlayoffRoundNames, isPlayoffStageSeeded, newPlayoffRoundSlot } from '~/helpers/playoff';

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
});

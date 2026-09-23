import { describe, expect, it } from 'vitest';
import { newMatch } from '~/helpers/match';
import { addSecondLegToSlot, getPlayoffRoundSlotWinner, newPlayoffRoundSlot, simulatePlayoffRoundSlotScore } from '~/helpers/playoff-slot';

describe('playoff-slot', () => {
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

  describe('simulatePlayoffRoundSlotScore', () => {
    it('should not change the slot when a leg is not seeded', () => {
      const slot = newPlayoffRoundSlot(0);

      simulatePlayoffRoundSlotScore(slot);

      expect(slot.legs[0].homeTeam.score).toBeNull();
      expect(slot.legs[0].awayTeam.score).toBeNull();
    });

    it('should fill scores on all legs of a seeded slot', () => {
      const slot = newPlayoffRoundSlot(0);

      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';
      slot.legs.push(newMatch('away-id', 'home-id'));

      simulatePlayoffRoundSlotScore(slot);

      for (const leg of slot.legs) {
        expect(typeof leg.homeTeam.score).toBe('number');
        expect(typeof leg.awayTeam.score).toBe('number');
      }
    });

    it('should produce a decided slot for a seeded slot', () => {
      const slot = newPlayoffRoundSlot(0);
      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';

      simulatePlayoffRoundSlotScore(slot);

      expect(getPlayoffRoundSlotWinner(slot)).toBeTruthy();
    });
  });

  describe('addSecondLegToSlot', () => {
    it('should add a second leg to the slot', () => {
      const slot = newPlayoffRoundSlot(0);
      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';

      addSecondLegToSlot(slot);

      expect(slot.legs[1]).toBeTruthy();
      expect(slot.legs[1]?.homeTeam.id).toBe('away-id');
      expect(slot.legs[1]?.awayTeam.id).toBe('home-id');
    });

    it('should not add a second leg when the slot is double-legged', () => {
      const slot = newPlayoffRoundSlot(0);
      slot.legs[0].homeTeam.id = 'home-id';
      slot.legs[0].awayTeam.id = 'away-id';

      addSecondLegToSlot(slot);
      addSecondLegToSlot(slot);

      expect(slot.legs.length).toBe(2);
    });
  });
});

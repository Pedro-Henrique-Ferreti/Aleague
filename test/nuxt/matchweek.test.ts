import { describe, expect, it } from 'vitest';
import { getExpectedMatchesPerWeek, getExpectedMatchweeksPerRoundRobin, getMaxPossibleMatchweeksPerRoundRobin } from '~/helpers/matchweek';

describe('matchweek', () => {
  describe('getExpectedMatchesPerWeek', () => {
    it('should return the correct number of matches per week', () => {
      expect(getExpectedMatchesPerWeek(4)).toBe(2);
      expect(getExpectedMatchesPerWeek(6)).toBe(3);
      expect(getExpectedMatchesPerWeek(20)).toBe(10);
    });

    it('should handle invalid teamsCount', () => {
      expect(getExpectedMatchesPerWeek(-1)).toBe(0);
      expect(getExpectedMatchesPerWeek(1)).toBe(0);
      expect(getExpectedMatchesPerWeek(5)).toBe(0);
    });
  });

  describe('getMaxPossibleMatchweeksPerRoundRobin', () => {
    it('should return the correct number of matchweeks per round robin', () => {
      expect(getMaxPossibleMatchweeksPerRoundRobin(4)).toBe(3);
      expect(getMaxPossibleMatchweeksPerRoundRobin(8)).toBe(7);
      expect(getMaxPossibleMatchweeksPerRoundRobin(12)).toBe(11);
    });
  });

  describe('getExpectedMatchweeksPerRoundRobin', () => {
    it('should return the correct number of matchweeks per round robin', () => {
      expect(getExpectedMatchweeksPerRoundRobin(4)).toBe(3);
      expect(getExpectedMatchweeksPerRoundRobin(8)).toBe(7);
      expect(getExpectedMatchweeksPerRoundRobin(12, 4)).toBe(8);
      expect(getExpectedMatchweeksPerRoundRobin(16, 8)).toBe(8);
    });
  });
});

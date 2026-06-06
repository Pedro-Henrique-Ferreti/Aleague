import { describe, expect, it } from 'vitest';
import { appendNumericSuffix, getTimestamp } from '~/helpers/file';

describe('file', () => {
  describe('getTimestamp', () => {
    it('should return a valid ISO date string', () => {
      const result = getTimestamp();
      const parsed = new Date(result);

      expect(parsed.toISOString()).toBe(result);
    });
  });

  describe('appendNumericSuffix', () => {
    it('should return the original name with (1) when no tournaments exist', () => {
      const result = appendNumericSuffix('My Tournament', []);

      expect(result).toBe('My Tournament (1)');
    });

    it('should return the original name with (2) when one tournament with same name exists', () => {
      const tournaments = [
        { name: 'My Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (2)');
    });

    it('should increment the suffix for each existing tournament', () => {
      const tournaments = [
        { name: 'My Tournament' },
        { name: 'My Tournament (2)' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (3)');
    });

    it('should not affect tournaments with different names', () => {
      const tournaments = [
        { name: 'Other Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament', tournaments);

      expect(result).toBe('My Tournament (1)');
    });

    it('should strip existing numeric suffix from the input name', () => {
      const tournaments = [
        { name: 'My Tournament' },
      ] as Tournament[];

      const result = appendNumericSuffix('My Tournament (1)', tournaments);

      expect(result).toBe('My Tournament (2)');
    });

    it('should handle names with multiple words correctly', () => {
      const tournaments = [
        { name: 'Champions League' },
        { name: 'Champions League (2)' },
        { name: 'Champions League (3)' },
      ] as Tournament[];

      const result = appendNumericSuffix('Champions League', tournaments);

      expect(result).toBe('Champions League (4)');
    });
  });
});

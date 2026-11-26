import { describe, expect, it } from 'vitest';

describe('date utils', () => {
  describe('newTimestamp', () => {
    it('should return a valid ISO date string', () => {
      const result = newTimestamp();
      const parsed = new Date(result);

      expect(parsed.toISOString()).toBe(result);
    });
  });

  describe('formatDate', () => {
    it('should handle empty params', () => {
      expect(formatDate()).toBe('');
      expect(formatDate(new Date())).toBe('');
      expect(formatDate('', '')).toBe('');
    });
  });
});

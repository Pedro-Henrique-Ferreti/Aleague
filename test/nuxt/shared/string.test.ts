import { describe, expect, it } from 'vitest';

describe('string utils', () => {
  describe('normalizeString', () => {
    it('should remove non-English characters', () => {
      expect(normalizeString('çãoê')).toBe('caoe');
      expect(normalizeString('áàéêííööüüçéâãôöüç')).toBe('aaeeiioouuceaaoouc');
    });
  });

  describe('matchesSearch', () => {
    it('should return true if the query is empty', () => {
      expect(matchesSearch('', 'anything')).toBe(true);
    });

    it('should return true when text contains the query as substring', () => {
      expect(matchesSearch('abc', 'abcdef')).toBe(true);
      expect(matchesSearch('hello', 'say hello world')).toBe(true);
    });

    it('should return false when query is not found in text', () => {
      expect(matchesSearch('xyz', 'abcdef')).toBe(false);
      expect(matchesSearch('tests', 'test')).toBe(false);
    });

    it('should be case-insensitive and accent-insensitive', () => {
      expect(matchesSearch('HELLO', 'hello world')).toBe(true);
      expect(matchesSearch('HeLLo', 'hElLo WoRlD')).toBe(true);
      expect(matchesSearch('cao', 'ação')).toBe(true);
      expect(matchesSearch('sao paulo', 'São Paulo')).toBe(true);
    });
  });
});

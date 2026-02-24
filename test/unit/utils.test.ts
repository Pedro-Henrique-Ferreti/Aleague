import { describe, expect, it } from 'vitest';
import { clone, createArray, formatDate, normalizeString } from '../../app/utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('should handle empty params', () => {
      expect(formatDate()).toBe('');
      expect(formatDate(new Date())).toBe('');
      expect(formatDate('', '')).toBe('');
    });
  });

  describe('normalizeString', () => {
    it('should remove non-English characters', () => {
      expect(normalizeString('çãoê')).toBe('caoe');
      expect(normalizeString('áàéêííööüüçéâãôöüç')).toBe('aaeeiioouuceaaoouc');
    });
  });

  describe('clone', () => {
    it('should clone an object and remove memory reference', () => {
      const object = { a: 1, b: 2 };
      const clonedObject = clone(object);

      expect(clonedObject).toEqual(object);

      clonedObject.a = 2;

      expect(object.a).not.toBe(clonedObject.a);
    });
  });

  describe('createArray', () => {
    it('should create an array with the correct length', () => {
      const array = createArray(5);
      expect(array.length).toBe(5);
    });

    it('should create an array of numbers if value is not provided', () => {
      expect(createArray(3)).toEqual([0, 1, 2]);
    });

    it('should call the function if provided and pass the current loop index to it', () => {
      const array = createArray(3, index => index + 3);
      expect(array).toEqual([3, 4, 5]);
    });
  });
});

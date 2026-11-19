import { describe, expect, it } from 'vitest';
import { createArray, getRandomItem, getShortestItem } from '../../app/utils/array';

describe('array utils', () => {
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

  describe('getRandomItem', () => {
    it('should return a random item from the array', () => {
      const array = [1, 2, 3, 4, 5];
      for (let i = 0; i < 100; i++) {
        expect(array.includes(getRandomItem(array))).toBe(true);
      }
    });
  });

  describe('getShortestItem', () => {
    it('should return the item with the shortest length', () => {
      const array = ['a', 'ab', 'abc', 'abcd', 'abcde'];
      expect(getShortestItem(array, item => item.length)).toBe('a');
    });
  });
});

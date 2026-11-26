import { describe, expect, it } from 'vitest';
import { clone, hasChanges } from '../../app/shared/utils';

describe('object utils', () => {
  describe('clone', () => {
    it('should clone an object and remove memory reference', () => {
      const object = { a: 1, b: 2 };
      const clonedObject = clone(object);

      expect(clonedObject).toEqual(object);

      clonedObject.a = 2;

      expect(object.a).not.toBe(clonedObject.a);
    });
  });

  describe('hasChanges', () => {
    it('should return true if the objects are different', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };

      expect(hasChanges(obj1, obj2)).toBe(true);
    });

    it('should return false if the objects are the same', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2 };

      expect(hasChanges(obj1, obj2)).toBe(false);
    });
  });
});

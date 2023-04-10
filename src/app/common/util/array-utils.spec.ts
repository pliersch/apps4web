import { difference, intersect, joinUnique } from "@app/common/util/array-utils";

describe('array-utils', () => {

  describe('difference', () => {

    it('should compare [1,2,3,4] and [3,4] and return [1,2]', () => {
      const keep = [1, 2, 3, 4];
      const remove = [3, 4];
      const diff = difference(keep, remove);
      expect(diff).toEqual([1, 2]);
    });

    it('should compare [1,2] and [1,2] and return []', () => {
      const keep = [1, 2];
      const remove = [1, 2];
      const diff = difference(keep, remove);
      expect(diff).toEqual([]);
    });

    it('should compare [1,2] and [1,2,3] and return []', () => {
      const keep = [1, 2];
      const remove = [1, 2, 3];
      const diff = difference(keep, remove);
      expect(diff).toEqual([]);
    });
  });

  describe('intersect', () => {

    it('should compare [1,2,3] and [2,3,4] and return [2,3]', () => {
      const one = [1, 2, 3];
      const two = [2, 3, 4];
      const diff = intersect(one, two);
      expect(diff).toEqual([2, 3]);
    });

    it('should compare [1,2] and [1,2] and return []', () => {
      const one = [1, 2];
      const two = [1, 2];
      const diff = difference(one, two);
      expect(diff).toEqual([]);
    });
  });

  describe('joinUnique', () => {

    it('should compare [1,2,3] and [2,3,4] and return [1,2,3,4]', () => {
      const one = [1, 2, 3];
      const two = [2, 3, 4];
      const diff = joinUnique(one, two);
      expect(diff).toEqual([1, 2, 3, 4]);
    });

    it('should compare [1,2] and [1,2] and return [1,2]', () => {
      const one = [1, 2];
      const two = [1, 2];
      const diff = joinUnique(one, two);
      expect(diff).toEqual([1, 2]);
    });

    it('should compare ' +
      '[{a:1, b:2},{a:2, b:3}] and ' +
      '[{a:1, b:2},{a:2, b:3}] and return [{a:1, b:2},{a:2, b:3}]', () => {
      const one = [{a: 1, b: 2}, {a: 2, b: 3}];
      const two = [{a: 1, b: 2}, {a: 2, b: 3}];
      const diff = joinUnique(one, two);
      console.log('diff : ', diff)
      expect(diff).toEqual([{a: 1, b: 2}, {a: 2, b: 3}]);
    });
  });
});

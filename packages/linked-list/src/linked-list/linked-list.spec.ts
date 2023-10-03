import { describe, expect, it } from 'vitest';
import { ZLinkedList } from './linked-list';

describe('ZLinkedList', () => {
  const createTestTarget = () => new ZLinkedList<number>();

  describe('Add', () => {
    describe('Back', () => {
      it('should increment the count by 1', () => {
        // Arrange.
        const target = createTestTarget();
        // Act.
        target.addBack(1);
        const actual = target.length();
        // Assert.
        expect(actual).toEqual(1);
      });

      it('should add to the back of the linked list', () => {
        // Arrange.
        const target = createTestTarget();
        target.addBack(1);
        target.addBack(2);
        const expected = 3;
        // Act.
        target.addBack(expected);
        const actual = target.back();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });

    describe('Front', () => {
      it('should increment the count by 1', () => {
        // Arrange.
        const target = createTestTarget();
        // Act.
        target.addFront(1);
        const actual = target.length();
        // Assert.
        expect(actual).toEqual(1);
      });

      it('should add to the front of the linked list', () => {
        // Arrange.
        const target = createTestTarget();
        target.addBack(2);
        target.addBack(3);
        const expected = 1;
        // Act.
        target.addFront(expected);
        const actual = target.front();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Remove', () => {
    describe('Front', () => {
      it('should decrement the count by 1', () => {
        // Arrange.
        const target = createTestTarget();
        target.addBack(1);
        target.addBack(2);
        target.addBack(3);
        // Act.
        target.removeFront();
        const actual = target.length();
        // Assert.
        expect(actual).toEqual(2);
      });

      it('should remove the node at the front', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = 2;
        target.addBack(1);
        target.addBack(expected);
        target.addBack(3);
        // Act.
        target.removeFront();
        const actual = target.front();
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should return the node that was at the front', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = 1;
        target.addBack(expected);
        target.addBack(2);
        // Act.
        const actual = target.removeFront();
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should return null if the list is empty', () => {
        // Arrange.
        const target = createTestTarget();
        // Act.
        const actual = target.removeFront();
        // Assert.
        expect(actual).toBeNull();
      });

      it('should keep the length at 0 if the list is empty', () => {
        // Arrange.
        const target = createTestTarget();
        // Act.
        target.removeFront();
        target.removeFront();
        target.removeFront();
        const actual = target.length();
        // Assert.
        expect(actual).toEqual(0);
      });
    });

    describe('Back', () => {
      it('should decrement the count by 1', () => {
        // Arrange.
        const target = createTestTarget();
        target.addBack(1);
        target.addBack(2);
        target.addBack(3);
        // Act.
        target.removeFront();
        const actual = target.length();
        // Assert.
        expect(actual).toEqual(2);
      });

      it('should remove the node at the back', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = 2;
        target.addBack(1);
        target.addBack(expected);
        target.addBack(3);
        // Act.
        target.removeBack();
        const actual = target.back();
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Clear', () => {
    it('should set the length to 0', () => {
      // Arrange.
      const target = createTestTarget();
      target.addBack(1);
      target.addBack(2);
      target.addFront(3);
      // Act.
      target.clear();
      const actual = target.length();
      // Assert.
      expect(actual).toEqual(0);
    });

    it('should return a null front', () => {
      // Arrange.
      const target = createTestTarget();
      target.addBack(1);
      target.addBack(2);
      target.addFront(3);
      // Act.
      target.clear();
      const actual = target.front();
      // Assert.
      expect(actual).toBeNull();
    });

    it('should return a null back', () => {
      // Arrange.
      const target = createTestTarget();
      target.addBack(1);
      target.addBack(2);
      target.addFront(3);
      // Act.
      target.clear();
      const actual = target.back();
      // Assert.
      expect(actual).toBeNull();
    });
  });

  describe('Iterable', () => {
    describe('Forward', () => {
      it('should iterate through the list in the order that items are inserted', () => {
        // Arrange.
        const target = createTestTarget();
        const actual: number[] = [];
        target.addBack(1);
        target.addBack(2);
        target.addBack(3);
        target.addBack(4);

        // Act.
        for (const d of target) {
          actual.push(d);
        }

        // Assert.
        expect(actual).toEqual([1, 2, 3, 4]);
      });

      it('should be done and stay done', () => {
        // Arrange.
        const target = createTestTarget();
        const iterator = target.forward();
        // Act.
        const a1 = iterator.next();
        const a2 = iterator.next();
        const a3 = iterator.next();
        const actual = a1.done && a2.done && a3.done;
        // Assert
        expect(actual).toBeTruthy();
      });
    });
  });
});

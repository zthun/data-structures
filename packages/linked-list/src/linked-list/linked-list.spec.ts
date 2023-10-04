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

      it('should add to the back of the linked list in the specific order', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expected.forEach((v) => target.addBack(v));
        // Act.
        const actual = target.toArray();
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
      it('should iterate all items from front to back', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expected.forEach((v) => target.addBack(v));
        const iterator = target.forward();
        const actual: (number | null)[] = [];
        // Act.
        for (let { done } = iterator.next(); !done; { done } = iterator.next()) {
          actual.push(iterator.value());
        }
        // Assert.
        expect(actual).toEqual(expected);
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

      describe('Insert', () => {
        it('should insert as the first item on an empty list', () => {
          // Arrange.
          const target = createTestTarget();
          const iterator = target.forward();
          // Act.
          iterator.insert(1);
          const actual = target.toArray();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toEqual([1]);
        });

        it('should insert as the first item if it is not seeded', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(2);
          target.addBack(3);
          const iterator = target.forward();
          // Act.
          iterator.insert(1);
          const actual = target.toArray();
          // Assert.
          expect(actual).toEqual([1, 2, 3]);
        });

        it('should insert at a specific pointer to the iterator', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(2);
          target.addBack(3);
          target.addBack(4);
          const iterator = target.forward();
          iterator.next();
          iterator.next();
          iterator.next();
          // Act.
          iterator.insert(2.5);
          const actual = target.toArray();
          // Assert
          expect(actual).toEqual([1, 2, 2.5, 3, 4]);
        });

        it('should not include the item that was just added to the iteration', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(3);
          target.addBack(4);
          const iterator = target.forward();
          // Act.
          iterator.insert(2);
          iterator.next();
          iterator.insert(2.5);
          iterator.insert(2.6);
          const actual = target.toArray();
          // Assert.
          expect(actual).toEqual([2, 2.5, 2.6, 3, 4]);
        });

        it('should iterate through the rest of the linked list', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(3);
          target.addBack(4);
          const iterator = target.forward();
          // Act.
          iterator.next();
          iterator.insert(1);
          iterator.insert(2);
          iterator.next();
          const { done } = iterator.next();
          // Assert.
          expect(done).toBeTruthy();
        });
      });

      describe('Remove', () => {
        it('should remove at a specific pointer to the iterator', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(2);
          target.addBack(3);
          const iterator = target.forward();
          const expected = [1, 3];
          const actual: (number | null)[] = [];
          // Act
          actual.push(iterator.next().value);
          iterator.next();
          iterator.remove();
          actual.push(iterator.next().value);
          const { done } = iterator.next();
          // Assert.
          expect(target.length()).toEqual(expected.length);
          expect(actual).toEqual(expected);
          expect(done).toBeTruthy();
        });

        it('should return null if the list is empty', () => {
          // Arrange.
          const target = createTestTarget();
          // Act
          const iterator = target.forward();
          const actual = iterator.remove();
          // Assert.
          expect(actual).toBeNull();
        });

        it('should return null if the iterator was not seeded', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          // Act.
          const iterator = target.forward();
          const actual = iterator.remove();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toBeNull();
        });

        it('should return null if the iterator is finished', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          // Act.
          const iterator = target.forward();
          iterator.next();
          iterator.next();
          const actual = iterator.remove();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toBeNull();
        });
      });
    });

    describe('Backward', () => {
      it('should iterate all items from back to front', () => {
        // Arrange.
        const target = createTestTarget();
        const expected = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        expected.forEach((v) => target.addFront(v));
        const iterator = target.backward();
        const actual: (number | null)[] = [];
        // Act.
        for (let { done } = iterator.next(); !done; { done } = iterator.next()) {
          actual.push(iterator.value());
        }
        // Assert.
        expect(actual).toEqual(expected);
      });

      it('should be done and stay done', () => {
        // Arrange.
        const target = createTestTarget();
        const iterator = target.backward();
        // Act.
        const a1 = iterator.next();
        const a2 = iterator.next();
        const a3 = iterator.next();
        const actual = a1.done && a2.done && a3.done;
        // Assert
        expect(actual).toBeTruthy();
      });

      describe('Insert', () => {
        it('should insert as the first item on an empty list', () => {
          // Arrange.
          const target = createTestTarget();
          const iterator = target.backward();
          // Act.
          iterator.insert(1);
          const actual = target.toArray();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toEqual([1]);
        });

        it('should insert as the last item on a backward iterator if it is not seeded', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(2);
          const iterator = target.backward();
          // Act.
          iterator.insert(3);
          const actual = target.toArray();
          // Assert.
          expect(actual).toEqual([1, 2, 3]);
        });

        it('should insert at a specific pointer to the iterator', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(2);
          target.addBack(3);
          target.addBack(4);
          const iterator = target.backward();
          iterator.next();
          iterator.next();
          iterator.next();
          // Act.
          iterator.insert(1.5);
          const actual = target.toArray();
          // Assert
          expect(actual).toEqual([1, 1.5, 2, 3, 4]);
        });

        it('should move the iterator to the inserted item since we are moving in that direction', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(3);
          target.addBack(4);
          const iterator = target.backward();
          // Act.
          iterator.insert(5);
          iterator.next();
          iterator.insert(3.5);
          iterator.insert(3.4);
          const actual = target.toArray();
          // Assert.
          expect(actual).toEqual([3, 3.4, 3.5, 4, 5]);
        });

        it('should iterate through the rest of the linked list', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(4);
          const iterator = target.backward();
          // Act.
          iterator.next();
          iterator.insert(3);
          iterator.insert(2);
          iterator.next();
          const { done } = iterator.next();
          // Assert.
          expect(done).toBeTruthy();
        });
      });

      describe('Remove', () => {
        it('should remove at a specific pointer to the iterator', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          target.addBack(2);
          target.addBack(3);
          const iterator = target.backward();
          const expected = [3, 1];
          const actual: (number | null)[] = [];
          // Act
          actual.push(iterator.next().value);
          iterator.next();
          iterator.remove();
          actual.push(iterator.next().value);
          const { done } = iterator.next();
          // Assert.
          expect(target.length()).toEqual(expected.length);
          expect(actual).toEqual(expected);
          expect(done).toBeTruthy();
        });

        it('should return null if the list is empty', () => {
          // Arrange.
          const target = createTestTarget();
          // Act
          const iterator = target.backward();
          const actual = iterator.remove();
          // Assert.
          expect(actual).toBeNull();
        });

        it('should return null if the iterator was not seeded', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          // Act.
          const iterator = target.backward();
          const actual = iterator.remove();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toBeNull();
        });

        it('should return null if the iterator is finished', () => {
          // Arrange.
          const target = createTestTarget();
          target.addBack(1);
          // Act.
          const iterator = target.backward();
          iterator.next();
          iterator.next();
          const actual = iterator.remove();
          // Assert.
          expect(target.length()).toEqual(1);
          expect(actual).toBeNull();
        });
      });
    });
  });
});

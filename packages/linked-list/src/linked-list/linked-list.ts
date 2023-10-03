interface IZLinkedListNode<TData> {
  next?: IZLinkedListNode<TData>;
  prev?: IZLinkedListNode<TData>;
  value: TData | null;
}

/**
 * An iterator which can loop through a ZLinkedList implementation.
 */
export interface IZLinkedListIterator<TData> extends Iterator<TData> {
  /**
   * The current value that iterator points to.
   *
   * Will point to null if the iterator is complete, or if
   * it has not been seeded.
   */
  readonly value: TData | null;

  /**
   * Removes the current data node that the iterator
   * points to.
   *
   * After a call to this, the iterator is invalidated and
   * completed.
   *
   * @returns
   *        The data that was removed or null if the
   *        iterator is complete or has not yet
   *        been seeded.
   */
  remove(): TData | null;

  /**
   * Inserts a value before the current data that
   * the iterator points to.
   *
   * If this iterator has not been seeded, then the
   * value will be inserted as the first item in the linked list.
   * If the iterator has ended, then the value will be inserted
   * at the back of the linked list.
   *
   * After a call to this, the iterator is invalidated and completed.
   *
   * @param value -
   *        The value to add.
   */
  insert(value: TData): void;
}

/**
 * A basic implementation of a doubly linked list.
 */
export class ZLinkedList<TData> implements Iterable<TData> {
  private _length: number = 0;
  private _front: IZLinkedListNode<TData> = {} as IZLinkedListNode<TData>;
  private _back: IZLinkedListNode<TData> = {} as IZLinkedListNode<TData>;

  [Symbol.iterator](): Iterator<TData> {
    return this.forward();
  }

  public constructor() {
    this._front = {} as IZLinkedListNode<TData>;
    this._back = {} as IZLinkedListNode<TData>;

    this._front.next = this._back;
    this._back.prev = this._front;
  }

  public length(): number {
    return this._length;
  }

  public front(): TData | null {
    return this._front.next!.value ?? null;
  }

  public back(): TData | null {
    return this._back.prev!.value ?? null;
  }

  public addBack(value: TData): void {
    this._iterator(undefined, undefined, undefined, this._back).insert(value);
  }

  public addFront(value: TData): void {
    this._iterator(undefined, undefined, undefined, this._front.next).insert(value);
  }

  public removeBack(): TData | null {
    return this._iterator(undefined, undefined, undefined, this._back.prev).remove();
  }

  public removeFront(): TData | null {
    return this._iterator(undefined, undefined, undefined, this._front.next).remove();
  }

  public clear() {
    this._length = 0;
    this._front.next = this._back;
    this._back.prev = this._front;
  }

  public forward(): IZLinkedListIterator<TData> {
    return this._iterator();
  }

  private _iterator(
    start: IZLinkedListNode<TData> = this._front,
    end: IZLinkedListNode<TData> = this._back,
    step: (node: IZLinkedListNode<TData>) => IZLinkedListNode<TData> = (n) => n.next!,
    current: IZLinkedListNode<TData> = start
  ): IZLinkedListIterator<TData> {
    const impl = {
      value: null as TData | null,
      _current: current
    };

    const next = (): IteratorResult<TData> => {
      if (impl._current === end) {
        return { done: true, value: undefined };
      }

      impl._current = step(impl._current);
      impl.value = impl._current.value ?? null;

      if (impl._current === end) {
        return { done: true, value: undefined };
      }

      return { done: false, value: impl._current.value! };
    };

    const remove = (): TData | null => {
      if (impl._current === start || impl._current === end) {
        return null;
      }

      const node = impl._current;
      --this._length;
      const { value } = node;
      const prev = node.prev!;
      const next = node.next!;
      prev.next = next;
      next.prev = prev;
      impl._current = end;
      impl.value = null;
      return value;
    };

    const insert = (value: TData): void => {
      ++this._length;
      const node: IZLinkedListNode<TData> = { value };
      const prev = impl._current.prev!;
      node.next = impl._current;
      node.prev = prev;
      prev.next = node;
      impl._current.prev = node;
      impl._current = end;
      impl.value = null;
    };

    return { ...impl, next, remove, insert };
  }
}

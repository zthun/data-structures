interface IZLinkedListNode<TData> {
  next?: IZLinkedListNode<TData>;
  prev?: IZLinkedListNode<TData>;
  value: TData | null;
}

/**
 * Represents an iterator that can enumerable values of a linked list.
 *
 * The direction being iterated depends on the implementation of the
 * iterator.
 */
export interface IZLinkedListIterator<TData> extends Iterator<TData> {
  /**
   * The current value that iterator points to.
   *
   * Will point to null if the iterator is complete, or if
   * it has not been seeded.
   */
  value(): TData | null;

  /**
   * Removes the current data node that the iterator
   * points to.
   *
   * The iterator will be set to the previous value
   * after an invocation to this method.
   *
   * @returns
   *        The data that was removed.  If the iterator is
   *        not seeded, then
   */
  remove(): TData | null;

  /**
   * Inserts a value before the current data that
   * the iterator points to.
   *
   * The behavior of the iterator will change based on the direction
   * you are moving.  If the next step in the iterator will be this
   * item, then the iterator will move to that item, otherwise,
   * it will continue to be on the item before the insert.
   *
   * @param value -
   *        The value to add.
   */
  insert(value: TData): void;
}

/**
 * Represents a doubly linked list.
 *
 * @param TData -
 *        The type of date stored at each node of the list.
 */
export class ZLinkedList<TData> implements Iterable<TData> {
  private _length: number = 0;
  private _front = {} as IZLinkedListNode<TData>;
  private _back = {} as IZLinkedListNode<TData>;

  /**
   * {@inheritdoc}
   */
  [Symbol.iterator](): Iterator<TData> {
    return this.forward();
  }

  /**
   * Initializes a new instance of this linked list object.
   */
  public constructor() {
    this._front = {} as IZLinkedListNode<TData>;
    this._back = {} as IZLinkedListNode<TData>;

    this._front.next = this._back;
    this._back.prev = this._front;
  }

  /**
   * Returns the total number of items in the linked list.
   *
   * @returns
   *        The total number of items in the linked list.
   */
  public length(): number {
    return this._length;
  }

  /**
   * Gets the item at the front of the list.
   *
   * @returns
   *        The item at the front of the list. Returns
   *        null if the list is empty.
   */
  public front(): TData | null {
    return this._front.next!.value ?? null;
  }

  /**
   * Gets the item at the back of the list.
   *
   * @returns
   *        The item at the back of the list.  Returns
   *        null if the list is empty.
   */
  public back(): TData | null {
    return this._back.prev!.value ?? null;
  }

  /**
   * Adds the data to the back of the list.
   *
   * @param value -
   *        The data to add.
   */
  public addBack(value: TData): void {
    this.backward().insert(value);
  }

  /**
   * Adds the data to the front of the list.
   *
   * @param value -
   *        The data to add.
   */
  public addFront(value: TData): void {
    this.forward().insert(value);
  }

  /**
   * Removes the item at the back of the list.
   *
   * @returns
   *        The data that was removed.  Returns null
   *        if the list is empty.
   */
  public removeBack(): TData | null {
    const it = this.backward();
    it.next();
    return it.remove();
  }

  /**
   * Removes the item at the front of the list.
   *
   * @returns
   *        The data that was removed.  Returns null
   *        if the list is empty.
   */
  public removeFront(): TData | null {
    const it = this.forward();
    it.next();
    return it.remove();
  }

  /**
   * Removes all data in the list.
   */
  public clear(): void {
    this._length = 0;
    this._front.next = this._back;
    this._back.prev = this._front;
  }

  /**
   * Returns a forward ordered array of the list.
   *
   * @returns
   *      An array of all data in the list iterated
   *      from front to back.
   */
  public toArray(): TData[] {
    const data: TData[] = [];

    for (const d of this) {
      data.push(d);
    }

    return data;
  }

  /**
   * Searches through the linked list starting at the point of an iterator
   * for an item that matches a predicate.
   *
   * @param match -
   *        Either a data value that is a candidate to search for in the list
   *        or a callback function where the first argument is the data to check
   *        and the return value is true if the argument is to match.
   * @param start -
   *        The current iterator to start at.  Note that this iterator will be mutated
   *        and returned once it finds the element, or it will be completed and null
   *        will be returned.
   *
   * @returns
   *        An iterator that points to the item that matches the predicate, or null
   *        if no such item exists.
   */
  public find(
    start: IZLinkedListIterator<TData>,
    match: ((x: TData) => boolean) | TData
  ): IZLinkedListIterator<TData> | null {
    const _predicate = typeof match === 'function' ? (match as (x: TData) => boolean) : (x: TData) => x === match;

    for (let { done, value } = start.next(); !done; { done, value } = start.next()) {
      if (_predicate(value)) {
        return start;
      }
    }

    return null;
  }

  /**
   * Searches through the linked list for the first item from the front
   * that matches a predicate.
   *
   * @param predicate -
   *        Either a data value that is a candidate to search for in the list
   *        or a callback function where the first argument is the data to check
   *        and the return value is true if the argument is to match.
   *
   * @returns
   *        An iterator that points to the item that matches the predicate, or null
   *        if no such item exists.
   */
  public findFirst(predicate: ((x: TData) => boolean) | TData): IZLinkedListIterator<TData> | null {
    return this.find(this.forward(), predicate);
  }

  /**
   * Searches through the linked list for the first item from the front
   * that matches a predicate.
   *
   * @param predicate -
   *        Either a data value that is a candidate to search for in the list
   *        or a callback function where the first argument is the data to check
   *        and the return value is true if the argument is to match.
   *
   * @returns
   *        An iterator that points to the item that matches the predicate, or null
   *        if no such item exists.
   */
  public findLast(predicate: TData | ((x: TData) => boolean)): IZLinkedListIterator<TData> | null {
    return this.find(this.backward(), predicate);
  }

  /**
   * Creates and returns an iterator that iterates
   * from front to back.
   *
   * @returns
   *      A linked list iterator that starts at the front
   *      and incrementally moves to the back after each
   *      next call.
   */
  public forward(): IZLinkedListIterator<TData> {
    return this._iterator(
      this._front,
      this._back,
      (n) => n.next!,
      (n) => n.prev!
    );
  }

  /**
   * Creates and returns an iterator that iterates
   * from back to front.
   *
   * @returns
   *      A linked list iterator that starts at the back and
   *      incrementally moves to the front after each next
   *      call.
   */
  public backward(): IZLinkedListIterator<TData> {
    return this._iterator(
      this._back,
      this._front,
      (n) => n.prev!,
      (n) => n.next!
    );
  }

  private _iterator(
    start: IZLinkedListNode<TData>,
    end: IZLinkedListNode<TData>,
    fwd: (node: IZLinkedListNode<TData>) => IZLinkedListNode<TData>,
    back: (node: IZLinkedListNode<TData>) => IZLinkedListNode<TData>
  ): IZLinkedListIterator<TData> {
    let _current = start;

    const value = () => _current.value;

    const next = (): IteratorResult<TData> => {
      if (_current === end) {
        return { done: true, value: null };
      }

      _current = fwd(_current);
      return { done: _current === end, value: _current.value! };
    };

    const remove = (): TData | null => {
      if (_current === start || _current === end) {
        return null;
      }

      const node = _current;
      const pivot = back(_current);
      _current = pivot;

      const prev = node.prev!;
      const next = node.next!;
      prev.next = next;
      next.prev = prev;

      --this._length;

      return node.value;
    };

    const insert = (value: TData): void => {
      const node: IZLinkedListNode<TData> = { value };
      let _next = _current;
      let _prev = _next.prev;

      if (_prev == null) {
        // This iterator is equal to this._front so we can just auto seed the iterator here
        // as if we are moving forward.
        _next = _current.next!;
        _prev = _current;
      }

      node.next = _next;
      node.prev = _prev;
      _prev.next = node;
      _next.prev = node;

      const candidate = fwd(_current);

      if (candidate === node) {
        // We're moving in the direction that the node was inserted. We need to jump the iterator
        // to the actual new node.
        _current = node;
      }

      ++this._length;
    };

    return { value, next, remove, insert };
  }
}

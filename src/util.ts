export const Util = {

  fill<T>(array: Array<T>, size: number, factory: () => T): Array<T> {
    if (size <= 0)
      return array;

    for (let i = 0; i < size; i++)
      array[i] = factory();

    return array;
  },

  assert(condition: boolean, message?: string) {
    if (condition)
      return;

    if (message === undefined)
      message = 'Assertion failed';

    throw new Error(message);
  },

  every<T>(collection: ArrayLike<T>, predicate: (value: T) => boolean): boolean {
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i]))
        return false;
    }
    return true;
  },

  equals(x: number, y: number): boolean {
    return x >= (y - (Number as any).EPSILON) && x <= (y + (Number as any).EPSILON);
  },

  notSupported(): Error {
    return new Error('Method is not supported');
  }


};
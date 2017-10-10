import { InternalEntry } from './internal-entry';
import { BoundingRectangle } from './bounding-rectangle';
import { Node } from './node';

export class InternalEntryImpl<T> implements InternalEntry<T> {
  subTree: Node<T>;
  mbr: BoundingRectangle;

  isInternal(): boolean {
    return true;
  }

  isLeaf(): boolean {
    return false;
  }
}
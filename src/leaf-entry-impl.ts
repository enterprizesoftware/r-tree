import { LeafEntry } from './leaf-entry';
import { BoundingRectangle } from './bounding-rectangle';

export class LeafEntryImpl<T> implements LeafEntry<T> {
  ref: T;
  mbr: BoundingRectangle;

  constructor(object: T, mbr: BoundingRectangle) {
    this.ref = object;
    this.mbr = mbr;
  }

  isInternal(): boolean {
    return false;
  }
  isLeaf(): boolean {
    return true;
  }

}

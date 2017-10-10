import { Node } from './node';
import { Entry } from './entry';
import { RegionAccessor } from './region-accessor';
import { Util } from './util';

export class NodeImpl<T> implements Node<T> {
  limit: number;
  entries: Array<Entry<T>>;

  constructor() {
    this.entries = [];
  }

  isLeaf(): boolean {
    if (this.entries.length === 0)
      return true;
    return Util.every(this.entries, entry => entry.isLeaf());
  }


  isInternal(): boolean {
    if (this.entries.length === 0)
      return false;
    return Util.every(this.entries, entry => entry.isInternal());
  }
}
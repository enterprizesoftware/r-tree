import { Node } from './node';
import { Entry } from './entry';
import { Util } from './util';
import { RTree } from './r-tree';
import { Region } from './region';

export abstract class NodeImpl<T> implements Node<T> {
  rTree: RTree<T>;
  level: number;
  id: any;
  capacity: number;
  mbr: Region;
  entries: Entry<T>[];

  numEntries(): number {
    return this.entries ? this.entries.length : 0;
  }

}
import { Entry } from './entry';
import { RTree } from './r-tree';
import { Region } from './region';

export interface Node<T> {
  rTree: RTree<T>;
  level: number;
  id: any;
  capacity: number;
  mbr: Region;
  entries: Entry<T>[];

  numEntries(): number;
  isLeaf(): boolean;
  isInternal(): boolean;
}
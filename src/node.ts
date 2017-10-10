import { Entry } from './entry';
import { RegionAccessor } from './region-accessor';

export interface Node<T> {
  entries: Array<Entry<T>>;

  isLeaf(): boolean;
  isInternal(): boolean;
}
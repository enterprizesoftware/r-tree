import { RegionAccessor } from './region-accessor';

export interface RTree<T> {
  insert(object: T): void;
}
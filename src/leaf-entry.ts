import { Entry } from './entry';
import { RegionAccessor } from './region-accessor';

export interface LeafEntry<T> extends Entry<T> {
  ref: T;
}
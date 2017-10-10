import { Node } from './node';
import { Entry } from './entry';
import { RegionAccessor } from './region-accessor';

export interface InternalEntry<T> extends Entry<T> {
  subTree: Node<T>;
}
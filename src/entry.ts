import { BoundingRectangle } from './bounding-rectangle';
import { RegionAccessor } from './region-accessor';

export interface Entry<T> {
  mbr: BoundingRectangle;

  isInternal(): boolean;
  isLeaf(): boolean;
}
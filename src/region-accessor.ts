import { BoundingRectangle } from './bounding-rectangle';

export interface RegionAccessor<T> {
  region(object: T): BoundingRectangle;
}
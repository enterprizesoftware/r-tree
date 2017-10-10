import { Shape } from './shape';
import { LineSegment } from './line-segment';
import { Point } from './point';

export interface Region extends Shape {
  low: Point;
  high: Point;

  equals(region: Region): boolean;


  intersectingRegion(region: Region): Region;
  intersectingArea(region: Region): number;
  margin(): number;

  combineRegion(region: Region): this;
  combinePoint(point: Point): this;

  combinedRegion(region: Region): Region;

  makeInfinite(): this;

}
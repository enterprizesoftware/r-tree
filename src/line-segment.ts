import { Shape } from './shape';
import { Region } from './region';
import { Point } from './point';

export interface LineSegment extends Shape {
  startPoint: Point;
  endPoint: Point;

  equals(lineSegment: LineSegment): boolean;
  relativeMinimumDistanceToPoint(point: Point): number;
  relativeMaximumDistanceToRegion(region: Region): number;
}

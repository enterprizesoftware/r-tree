import { Point } from './point';
import { Region } from './region';
import { LineSegment } from './line-segment';

export interface Shape {
  dimensions: number;

  center(): Point;
  mbr(): Region;
  area(): number;

  intersectsPoint(point: Point): boolean;
  intersectsRegion(region: Region): boolean;
  intersectsLineSegment(lineSegment: LineSegment): boolean;

  containsPoint(point: Point): boolean;
  containsRegion(region: Region): boolean;
  containsLineSegment(lineSegment: LineSegment): boolean;

  touchesPoint(point: Point): boolean;
  touchesRegion(region: Region): boolean;
  touchesLineSegment(lineSegment: LineSegment): boolean;

  minimumDistanceToPoint(point: Point): number;
  minimumDistanceToRegion(region: Region): number;
  minimumDistanceToLineSegment(lineSegment: LineSegment): number;
}
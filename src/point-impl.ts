import { Validate } from './validate';
import { Util } from './util';
import { Point } from './point';
import { Region } from './region';
import { RegionImpl } from './region-impl';
import { LineSegment } from './line-segment';

export class PointImpl implements Point {
  dimensions: number;
  coordinates: number[];

  constructor(dimensions: number, coordinates?: number[]) {
    Validate.dimensions(dimensions);
    if (coordinates === undefined) {
      coordinates = Util.fill([], dimensions, () => 0);
    } else {
      Util.assert(dimensions === coordinates.length, 'Dimensions do not match');
      coordinates = coordinates.slice();
    }
    this.dimensions = dimensions;
    this.coordinates = coordinates;
  }

  equals(point: Point): boolean {
    Validate.sameDimensions(this, point);
    for (let i = 0; i < this.dimensions; i++)
      if (!Util.equals(this.coordinates[i], point.coordinates[i]))
        return false;
    return true;
  }

  center(): Point {
    return this;
  }

  mbr(): Region {
    return new RegionImpl(this.dimensions, this, this);
  }

  area(): number {
    return 0;
  }

  intersectsPoint(point: Point): boolean {
    throw Util.notSupported();
  }

  intersectsRegion(region: Region): boolean {
    return region.containsPoint(this);
  }

  intersectsLineSegment(lineSegment: LineSegment): boolean {
    throw Util.notSupported();
  }

  containsPoint(point: Point): boolean {
    return false;
  }

  containsRegion(region: Region): boolean {
    return false;
  }

  containsLineSegment(lineSegment: LineSegment): boolean {
    return false;
  }

  touchesPoint(point: Point): boolean {
    return this.equals(point);
  }

  touchesRegion(region: Region): boolean {
    return region.touchesPoint(this);
  }

  touchesLineSegment(lineSegment: LineSegment): boolean {
    throw Util.notSupported();
  }

  minimumDistanceToPoint(point: Point): number {
    Validate.sameDimensions(this, point);
    let distanceSquared = 0;
    for (let i = 0; i < this.dimensions; i++)
      distanceSquared += Math.pow(this.coordinates[i] - point.coordinates[i], 2);
    return Math.sqrt(distanceSquared);
  }

  minimumDistanceToRegion(region: Region): number {
    return region.minimumDistanceToPoint(this);
  }

  minimumDistanceToLineSegment(lineSegment: LineSegment): number {
    throw !Util.notSupported();
  }

}
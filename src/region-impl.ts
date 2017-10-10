import { Point } from './point';
import { Validate } from './validate';
import { Region } from './region';
import { PointImpl } from './point-impl';
import { LineSegment } from './line-segment';
import { Util } from './util';
import { LineSegmentImpl } from './line-segment-impl';

export class RegionImpl implements Region {
  low: Point;
  high: Point;
  dimensions: number;

  constructor(dimensions: number, low?: Point, high?: Point) {
    Validate.dimensions(dimensions);
    this.high = high !== undefined ?
      new PointImpl(dimensions, high.coordinates) :
      new PointImpl(dimensions);
    this.low = low !== undefined ?
      new PointImpl(dimensions, low.coordinates) :
      new PointImpl(dimensions);
    Validate.sameDimensions(this, this.low);
    Validate.sameDimensions(this, this.high);
  }


  equals(region: Region): boolean {
    Validate.sameDimensions(this, region);
    for (let i = 0; i < this.dimensions; i++) {
      if (!Util.equals(this.low.coordinates[i], region.low.coordinates[i]))
        return false;
      if (!Util.equals(this.high.coordinates[i], region.high.coordinates[i]))
        return false;
    }
    return true;
  }

  intersectingRegion(region: Region): Region {
    Validate.sameDimensions(this, region);
    const intersecting = new RegionImpl(region.dimensions);
    intersecting.makeInfinite();
    for (let i = 0; i < this.dimensions; i++) {
      if (this.low.coordinates[i] > region.high.coordinates[i] ||
        this.high.coordinates[i] < region.low.coordinates[i])
        return intersecting;
    }
    for (let i = 0; i < this.dimensions; i++) {
      intersecting.low.coordinates[i] = Math.max(this.low.coordinates[i], region.low.coordinates[i]);
      intersecting.high.coordinates[i] = Math.min(this.high.coordinates[i], region.high.coordinates[i]);
    }
    return intersecting;
  }

  intersectingArea(region: Region): number {
    Validate.sameDimensions(this, region);
    let area = 1;
    let f1, f2;

    for (let i = 0; i < this.dimensions; i++) {
      if (this.low.coordinates[i] > region.high.coordinates[i] || this.high.coordinates[i] < region.low.coordinates[i]) return 0;

      f1 = Math.max(this.low.coordinates[i], region.low.coordinates[i]);
      f2 = Math.min(this.high.coordinates[i], region.high.coordinates[i]);
      area *= f2 - f1;
    }
    return area;
  }

  margin(): number {
    let mul = Math.pow(2, this.dimensions - 1);
    let margin = 0;
    for (let i = 0; i < this.dimensions; i++)
      margin += (this.high.coordinates[i] - this.low.coordinates[i]) * mul;
    return margin;
  }

  combineRegion(region: Region): this {
    Validate.sameDimensions(this, region);
    for (let i = 0; i < this.dimensions; i++) {
      this.low.coordinates[i] = Math.min(this.low.coordinates[i], region.low.coordinates[i]);
      this.high.coordinates[i] = Math.max(this.high.coordinates[i], region.high.coordinates[i]);
    }
    return this;  }

  combinePoint(point: Point): this {
    Validate.sameDimensions(this, point);
    for (let i = 0; i < this.dimensions; i++) {
      this.low.coordinates[i] = Math.min(this.low.coordinates[i], point.coordinates[i]);
      this.high.coordinates[i] = Math.max(this.high.coordinates[i], point.coordinates[i]);
    }
    return this;
  }

  combinedRegion(region: Region): Region {
    Validate.sameDimensions(this, region);
    const combined = new RegionImpl(this.dimensions, this.low, this.high);
    combined.combinedRegion(region);
    return combined;
  }

  makeInfinite() {
    for (let i = 0; i < this.dimensions; i++) {
      this.low.coordinates[i] = Number.MAX_VALUE;
      this.high.coordinates[i] = -Number.MAX_VALUE;
    }
    return this;
  }

  center(): Point {
    const p = new PointImpl(this.dimensions);
    for (let i = 0; i < this.dimensions; i++)
      p.coordinates[i] = (this.low.coordinates[i] + this.high.coordinates[i]) / 2;
    return p;
  }

  mbr(): Region {
    return this;
  }

  area(): number {
    let area = 1;
    for (let i = 0; i < this.dimensions; i++)
      area *= this.high.coordinates[i] - this.low.coordinates[i];
    return area;
  }

  intersectsPoint(point: Point): boolean {
    return this.containsPoint(point);
  }

  intersectsRegion(region: Region): boolean {
    Validate.sameDimensions(this, region);
    for (let i = 0; i < this.dimensions; i++) {
      if (this.low.coordinates[i] > region.high.coordinates[i])
        return false;
      if (this.high.coordinates[i] < region.low.coordinates[i])
        return false;
    }
    return true;
  }

  intersectsLineSegment(lineSegment: LineSegment): boolean {
    Util.assert(this.dimensions == 2, 'Intersects line segment only supported for 2 dimensions');
    Validate.sameDimensions(this, lineSegment);

    let ll = new PointImpl(2, this.low.coordinates);
    let ur = new PointImpl(2, this.high.coordinates);
    // fabricate ul and lr coordinates and points
    let c_ul = [this.low.coordinates[0], this.high.coordinates[1]];
    let c_lr = [this.high.coordinates[0], this.low.coordinates[1]];
    let ul = new PointImpl(2, c_ul);
    let lr = new PointImpl(2, c_lr);
    // Points/LineSegment for the segment
    let p1 = new PointImpl(2, lineSegment.startPoint.coordinates);
    let p2 = new PointImpl(2, lineSegment.endPoint.coordinates);
    return (this.containsPoint(p1) || this.containsPoint(p2)) ||
      lineSegment.intersectsLineSegment(new LineSegmentImpl(ll, ul)) ||
      lineSegment.intersectsLineSegment(new LineSegmentImpl(ul, ur)) ||
      lineSegment.intersectsLineSegment(new LineSegmentImpl(ur, lr)) ||
      lineSegment.intersectsLineSegment(new LineSegmentImpl(lr, ll));
  }

  containsPoint(point: Point): boolean {
    Validate.sameDimensions(this, point);
    for (let i = 0; i < this.dimensions; i++) {
      if (this.low.coordinates[i] > point.coordinates[i])
        return false;
      if (this.high.coordinates[i] < point.coordinates[i])
        return false;
    }
    return true;
  }

  containsRegion(region: Region): boolean {
    Validate.sameDimensions(this, region);
    for (let i = 0; i < this.dimensions; i++) {
      if (this.low.coordinates[i] > region.low.coordinates[i])
        return false;
      if (this.high.coordinates[i] < region.low.coordinates[i])
        return false;
    }
    return true;
  }

  containsLineSegment(lineSegment: LineSegment): boolean {
    throw Util.notSupported();
  }

  touchesPoint(point: Point): boolean {
    Validate.sameDimensions(this, point);
    for (let i = 0; i < this.dimensions; i++) {
      if (Util.equals(this.low.coordinates[i], point.coordinates[i]))
        return true;
      if (Util.equals(this.high.coordinates[i], point.coordinates[i]))
        return true;
    }
    return false;
  }

  touchesRegion(region: Region): boolean {
    Validate.sameDimensions(this, region);
    for (let i = 0; i < this.dimensions; i++) {
      if (!Util.equals(this.low.coordinates[i], region.low.coordinates[i]))
        continue;
      if (!Util.equals(this.high.coordinates[i], region.high.coordinates[i]))
        continue;
      return true;
    }
    return false;
  }

  touchesLineSegment(lineSegment: LineSegment): boolean {
    throw Util.notSupported();
  }

  minimumDistanceToPoint(point: Point): number {
    Validate.sameDimensions(this, point);
    let distSquared = 0;
    for (let i = 0; i < this.dimensions; i++) {
      if (point.coordinates[i] < this.low.coordinates[i])
        distSquared += Math.pow(this.low.coordinates[i] - point.coordinates[i], 2);
      else if (point.coordinates[i] > this.high.coordinates[i])
        distSquared += Math.pow(point.coordinates[i] - this.high.coordinates[i], 2);
    }
    return Math.sqrt(distSquared);
  }

  minimumDistanceToRegion(region: Region): number {
    Validate.sameDimensions(this, region);
    let distAccumulator = 0;
    for (let i = 0; i < this.dimensions; i++) {
      let temp = 0;
      if (region.high.coordinates[i] < this.low.coordinates[i])
        temp = Math.abs(region.high.coordinates[i] - this.low.coordinates[i]);
      else if (this.high.coordinates[i] < region.low.coordinates[i])
        temp = Math.abs(region.low.coordinates[i] - this.high.coordinates[i]);
      distAccumulator += temp * temp;
    }
    return Math.sqrt(distAccumulator)
  }

  minimumDistanceToLineSegment(lineSegment: LineSegment): number {
    throw Util.notSupported();
  }

// containsPoint(point: Point): boolean {
  //   for (let i = 0; i < this.dimensions; i++) {
  //     if (this.low.coordinates[i] > point.coordinates[i])
  //       return false;
  //     if (this.high.coordinates[i] < point.coordinates[i])
  //       return false;
  //   }
  //   return true;
  // }
}
import { LineSegment } from './line-segment';
import { Point } from './point';
import { Region } from './region';
import { PointImpl } from './point-impl';
import { Validate } from './validate';
import { Util } from './util';
import { RegionImpl } from './region-impl';

export class LineSegmentImpl implements LineSegment {
  dimensions: number;
  startPoint: Point;
  endPoint: Point;

  constructor(startPoint?: Point, endPoint?: Point) {
    this.startPoint = startPoint === undefined ? new PointImpl(2) : new PointImpl(2, startPoint.coordinates);
    this.endPoint = endPoint === undefined ? new PointImpl(2) : new PointImpl(2, endPoint.coordinates);
    Validate.sameDimensions(this, this.startPoint);
    Validate.sameDimensions(this, this.endPoint);
  }

  equals(lineSegment: LineSegment): boolean {
    Validate.sameDimensions(this, lineSegment);
    for (let i = 0; i < this.dimensions; i++) {
      if (!this.startPoint.equals(lineSegment.startPoint))
        return false;
      if (!this.endPoint.equals(lineSegment.endPoint))
        return false;
    }
    return true;
  }


doubleAreaTriangle(a: Point, b: Point, c: Point): number{
  let pA = a.coordinates;
  let pB= b.coordinates;
  let pC = c.coordinates;
  return (((pB[0] - pA[0]) * (pC[1] - pA[1])) - ((pC[0] - pA[0]) * (pB[1] - pA[1])));
}

  leftOf(a:Point, b:Point, c: Point):boolean {
  return (this.doubleAreaTriangle(a, b, c) > 0);
}

  collinear(a: Point, b: Point, c: Point):boolean {
    return this.doubleAreaTriangle(a, b, c) === 0;
  }

  // determine whether the segment comprised of a, b and segment of c, d intersect (exclusive of their endpoints..hence the "Proper")
  intersectsProper(a: Point, b: Point, c: Point, d: Point): boolean {
  if ( this.  collinear(a, b, c) || this.collinear(a, b, d) ||
  this.collinear(c, d, a) || this.collinear(c, d, b)) {
  return false;
}
return ((this.leftOf(a, b, c) ^ this.leftOf(a, b, d)) &&
  (this.leftOf(c, d, a) ^ this.leftOf(c, d, b)));
}

// if the points are collinear, is c between a & b
bool LineSegment::between(const SpatialIndex::Point &a, const SpatialIndex::Point &b, const SpatialIndex::Point &c) {
  if ( !collinear(a, b, c) ) {
    return false;
  }
  double *pA, *pB, *pC;
  pA = a.m_pCoords; pB = b.m_pCoords; pC = c.m_pCoords;
  if ( pA[0] != pB[0] ) { // a & b are not on the same vertical, compare on x axis
    return  between(pA[0], pB[0], pC[0]);
  } else { // a & b are a vertical segment, we need to compare on y axis
    return between(pA[1], pB[1], pC[1]);
  }
}
  intersects(a: Point, b: Point, c: Point, d: Point) {
    if (intersectsProper)
  }
}
  intersectsPoint(point: Point): boolean {
    return undefined;
  }

  intersectsLineSegment(lineSegment: LineSegment): boolean {
    Validate.sameDimensions(this, lineSegment);
    this.noHyperDimensions();
    let p1 = new PointImpl(2, this.startPoint.coordinates);
    let p2 = new PointImpl(2, this.endPoint.coordinates);
    let p3 = new PointImpl(2, lineSegment.startPoint.coordinates);
    let p4 = new PointImpl(2, lineSegment.endPoint.coordinates);
  }

  intersectsRegion(region: Region): boolean {
    Validate.sameDimensions(this, region);
    this.noHyperDimensions();
    return region.intersectsLineSegment(this);
  }
  relativeMinimumDistanceToPoint(point: Point): number {
    return undefined;
  }

  relativeMaximumDistanceToRegion(region: Region): number {
    return undefined;
  }

  center(): Point {
    const point = new PointImpl(this.dimensions);
    for (let i = 0; i < this.dimensions; i++) {
      point.coordinates[i] = (Math.abs(this.startPoint.coordinates[i] - this.endPoint.coordinates[i])/2) + Math.min(this.startPoint.coordinates[i], this.endPoint.coordinates[i]);
    }
    return point;
  }

  mbr(): Region {
    let low = new PointImpl(this.dimensions);
    let high = new PointImpl(this.dimensions);
    for (let i = 0; i < this.dimensions; i++) {
      low.coordinates[i] = Math.min(this.startPoint.coordinates[i], this.endPoint.coordinates[i]);
      high.coordinates[i] = Math.max(this.startPoint.coordinates[i], this.endPoint.coordinates[i]);
    }
    return new RegionImpl(this.dimensions, low, high);
  }

  area(): number {
    return 0;
  }

  containsPoint(point: Point): boolean {
    return undefined;
  }

  containsRegion(region: Region): boolean {
    return undefined;
  }

  containsLineSegment(lineSegment: LineSegment): boolean {
    return undefined;
  }

  touchesPoint(point: Point): boolean {
    return undefined;
  }

  touchesRegion(region: Region): boolean {
    return undefined;
  }

  touchesLineSegment(lineSegment: LineSegment): boolean {
    return undefined;
  }

  minimumDistanceToPoint(point: Point): number {
    Validate.sameDimensions(this, point);
    this.noHyperDimensions();
    if (Util.equals(this.endPoint.coordinates[0], this.startPoint.coordinates[0]))
      return Math.abs(point.coordinates[0] - this.startPoint.coordinates[0]);
    if (Util.equals(this.endPoint.coordinates[1], this.startPoint.coordinates[1]))
      return Math.abs(point.coordinates[1] - this.startPoint.coordinates[1]);
    let x1 = this.startPoint.coordinates[0];
    let x2 = this.endPoint.coordinates[0];
    let x0 = point.coordinates[0];
    let y1 = this.startPoint.coordinates[1];
    let y2 = this.endPoint.coordinates[1];
    let y0 = point.coordinates[1];
    return Math.abs((x2-x1)*(y1-y0)-(x1-x0)*(y2-y1))/(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
  }

  private noHyperDimensions() {
    Util.assert(this.dimensions === 2, 'Hyperdimensions not supported');
  }

  minimumDistanceToRegion(region: Region): number {
    return undefined;
  }

  minimumDistanceToLineSegment(lineSegment: LineSegment): number {
    return undefined;
  }

}
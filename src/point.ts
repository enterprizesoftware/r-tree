import { Shape } from './shape';

export interface Point extends Shape {
  dimensions: number;
  coordinates: number[];
  equals(point: Point): boolean;
}
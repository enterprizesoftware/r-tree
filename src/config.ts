import { Statistics } from './statistics';

export interface Config {
  dimensions: number;
  fillFactor: number;
  indexCapacity: number;
  leafCapacity: number;
  nearMinimumOverlapFactor: number;
  splitDistributionFactor: number;
  reinsertFactor: number;
  tightMbrs: boolean;
}
import { RTreeDataAccessor } from './r-tree-config';
import { Region } from './region';
import { Statistics } from './statistics';


export interface RTree<T> {
  fillFactor: number;
  indexCapacity: number;
  leafCapacity: number;
  nearMinimumOverlapFactor: number;
  splitDistributionFactor: number;
  reinsertFactor: number;
  dimensions: number;
  statistics: Statistics;
  tightMbrs: boolean;

  // infinite region

  insert(id: any, mbr: Region, object: T): this;
}
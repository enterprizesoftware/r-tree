import { Config } from './config';
import { Node } from './node';
import { ConfigImpl } from './config-impl';
import { RegionAccessor } from './r-tree-config';
import { validateConfig } from './validate-config';
import { RTree } from './r-tree';
import { ChooseLeaf } from './choose-leaf';
import { NodeImpl } from './node-impl';
import { BoundingRectangle } from './bounding-rectangle';
import { LeafEntryImpl } from './leaf-entry-impl';
import { Statistics } from './statistics';

export class RTreeImpl<T> implements RTree<T> {
  regionAccessor: RegionAccessor<T>;
  root: NodeImpl<T>;
  config: Config;
  fillFactor: number;
  indexCapacity: number;
  leafCapacity: number;
  nearMinimumOverlapFactor: number;
  splitDistributionFactor: number;
  reinsertFactor: number;
  dimensions: number;
  statistics: Statistics;
  tightMbrs: boolean;

  
  private chooseLeaf: ChooseLeaf<T>;

  constructor(regionAccessor: RegionAccessor<T>, config: Config = new ConfigImpl()) {
    this.config = config;
    this.regionAccessor = regionAccessor;
    this.chooseLeaf = new ChooseLeaf<T>(this);
  }

  insert(object: T): void {
    const mbr = this.regionAccessor.region(object);
    const entry = new LeafEntryImpl<T>(object, mbr);
    const leaf = this.chooseLeaf.find(entry);
  }
}
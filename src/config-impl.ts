import { Config } from './config';
import { Util } from './util';

export class ConfigImpl implements Config {
  fillFactor = 0.7;
  indexCapacity = 25;
  leafCapacity = 25;
  nearMinimumOverlapFactor = 8;
  splitDistributionFactor = 0.4;
  reinsertFactor = 0.3;
  tightMbrs = true;
  dimensions = 2;


}
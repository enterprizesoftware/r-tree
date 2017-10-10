import { Config } from './config';
import { Util } from './util';

export class ConfigImpl implements Config {
  maxEntries = 5;
  minEntries = 2;
  dimensions = 2;

}
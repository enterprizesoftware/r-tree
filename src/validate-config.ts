import { Util } from './util';
import { Config } from './config';

export function validateConfig(config: Config) {
  Util.assert(config.minEntries >= 2, 'Min entries must be greater than or equal to 2');
  Util.assert(config.minEntries <= (config.maxEntries / 2), 'Max entries must be at least twice as much as the min entries');
}

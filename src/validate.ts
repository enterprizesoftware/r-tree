import { Util } from './util';

export const Validate = {
  dimensions(value: number) {
    if (value === undefined)
      throw new Error('Dimension size must be specified for bounding mbr');
    if (value < 2)
      throw new Error('Number of dimensions should be more than 1');
  },

  sameDimensions(x: { dimensions: number }, y: { dimensions: number }) {
    Util.assert(x.dimensions === y.dimensions, 'Dimensions must match');
  }
};
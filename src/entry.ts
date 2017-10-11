import { Region } from './region';

export interface Entry<T> {
  mbr: Region;
  ref: T | Node;

  isInternal(): boolean;
  isLeaf(): boolean;
}
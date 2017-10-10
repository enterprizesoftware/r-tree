import { RTreeImpl } from './r-tree-impl';
import { NodeImpl } from './node-impl';
import { LeafEntry } from './leaf-entry';

export class ChooseLeaf<T> {
  private rTree: RTreeImpl<T>;

  constructor(rTree: RTreeImpl<T>) {
    this.rTree = rTree;
  }

  find(entry: LeafEntry<T>): NodeImpl<T> {
    let node = this.rTree.root;
    if (node.isLeaf())
      return node;

  }
}
import { SearchNode } from './search-node';

import { LogicalOperator } from './enums/logical-operator.enum';

import { SearchFilterGroupProps } from './search-filter-group.props';

export class SearchFilterGroup implements SearchNode {
  readonly operator: LogicalOperator;

  readonly nodes: SearchNode[];

  constructor(props: SearchFilterGroupProps) {
    this.operator = props.operator;

    this.nodes = props.nodes;
  }
}

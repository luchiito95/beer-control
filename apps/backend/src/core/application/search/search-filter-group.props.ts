import { LogicalOperator } from './enums/logical-operator.enum';

import { SearchNode } from './search-node';

export interface SearchFilterGroupProps {
  operator: LogicalOperator;

  nodes: SearchNode[];
}

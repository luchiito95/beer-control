import { SearchNode } from './search-node';

import { SearchFilterProps } from './search-filter.props';

export class SearchFilter implements SearchNode {
  readonly field: string;

  readonly operator;

  readonly value;

  constructor(props: SearchFilterProps) {
    this.field = props.field;

    this.operator = props.operator;

    this.value = props.value;
  }
}

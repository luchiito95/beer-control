import { LogicalOperator } from './enums/logical-operator.enum';

import { SearchCriteriaProps } from './search-criteria.props';

import { SearchFilterGroup } from './search-filter-group';

import { SearchSort } from './search-sort';

export class SearchCriteria {
  readonly page: number;

  readonly pageSize: number;

  readonly root: SearchFilterGroup;

  readonly sort: SearchSort[];

  constructor(props: SearchCriteriaProps) {
    this.page = props.page ?? 1;

    this.pageSize = props.pageSize ?? 10;

    this.root =
      props.root ??
      new SearchFilterGroup({
        operator: LogicalOperator.AND,

        nodes: [],
      });

    this.sort = props.sort ?? [];
  }
}

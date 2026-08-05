import { SearchSortProps } from './search-sort.props';

import { SortDirection } from './enums/sort-direction.enum';

export class SearchSort {
  readonly field: string;

  readonly direction: SortDirection;

  constructor(props: SearchSortProps) {
    this.field = props.field;

    this.direction = props.direction;
  }
}

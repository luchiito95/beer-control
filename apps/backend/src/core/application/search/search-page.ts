import { SearchCriteria } from './search-criteria';
import { SearchPageProps } from './search-page.props';

export class SearchPage<T> {
  readonly items: readonly T[];

  readonly criteria: SearchCriteria;

  readonly totalItems: number;

  constructor(props: SearchPageProps<T>) {
    this.items = props.items;

    this.criteria = props.criteria;

    this.totalItems = props.totalItems;
  }
}

import { SearchFilterGroup } from './search-filter-group';
import { SearchSort } from './search-sort';

export interface SearchCriteriaProps {
  page?: number;

  pageSize?: number;

  root?: SearchFilterGroup;

  sort?: SearchSort[];
}

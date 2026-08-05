import { SearchCriteria } from './search-criteria';

export interface SearchPageProps<T> {
  items: T[];

  criteria: SearchCriteria;

  totalItems: number;
}

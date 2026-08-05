import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';

export class SearchProductsQuery {
  constructor(public readonly criteria: SearchCriteria) {}
}

import { SearchCriteria } from '@core/application/search';

export class SearchStockQuery {

  constructor(

    public readonly criteria: SearchCriteria,

  ) {}

}
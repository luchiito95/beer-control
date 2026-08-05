import { SearchCriteria } from '@core/application/search';

export class SearchInventoryMovementsQuery {

  constructor(

    public readonly criteria: SearchCriteria,

  ) {}

}
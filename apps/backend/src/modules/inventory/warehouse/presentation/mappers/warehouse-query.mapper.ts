import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteWarehouseCommand } from '../../application/delete-warehouse/delete-warehouse.command';

import { GetWarehouseQuery } from '../../application/queries/get-warehouse/get-warehouse.query';
import { SearchWarehousesQuery } from '../../application/queries/search-warehouses/search-warehouses.query';

export class WarehouseQueryMapper {
  static toGet(id: string): GetWarehouseQuery {
    return new GetWarehouseQuery(id);
  }

  static toDelete(id: string): DeleteWarehouseCommand {
    return new DeleteWarehouseCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchWarehousesQuery {
    return new SearchWarehousesQuery(criteria);
  }
}

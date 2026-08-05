import { SearchPage } from '../../../../../core/application/search/search-page';

import { WarehouseEntity } from '../../domain/entities/warehouse.entity';

import { GetWarehouseResult } from '../../application/queries/get-warehouse/get-warehouse.result';
import { WarehouseSummaryResult } from '../../application/queries/search-warehouses/warehouse-summary.result';

export class WarehouseResponseMapper {
  static toGetResult(warehouse: WarehouseEntity): GetWarehouseResult {
    return new GetWarehouseResult(
      warehouse.id,

      warehouse.branchId,

      warehouse.code,

      warehouse.name,

      warehouse.description,

      warehouse.status,

      warehouse.createdAt,

      warehouse.updatedAt,
    );
  }

  static toSummary(warehouse: WarehouseEntity): WarehouseSummaryResult {
    return new WarehouseSummaryResult(
      warehouse.id,

      warehouse.branchId,

      warehouse.code,

      warehouse.name,

      warehouse.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<WarehouseEntity>,
  ): SearchPage<WarehouseSummaryResult> {
    return new SearchPage({
      items: page.items.map((warehouse) =>
        WarehouseResponseMapper.toSummary(warehouse),
      ),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

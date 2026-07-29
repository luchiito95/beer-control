import { PageResult } from '../../../../../core/application/pagination/page-result';

import { GetWarehouseResult } from '../../application/queries/get-branch/get-warehouse.result';
import { WarehouseSummaryResult } from '../../application/queries/list-branches/warehouse-summary.result';

import { WarehouseEntity } from '../../domain/entities/warehouse.entity';


export class WarehouseResponseMapper {

  static toGetResult(
    warehouse: WarehouseEntity,
  ): GetWarehouseResult {

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

  static toSummary(
    warehouse: WarehouseEntity,
  ): WarehouseSummaryResult {

    return new WarehouseSummaryResult(
      warehouse.id,
      warehouse.branchId,
      warehouse.code,
      warehouse.name,
      warehouse.status,
    );
  }

  static toSummaryPage(
    page: PageResult<WarehouseEntity>,
  ): PageResult<WarehouseSummaryResult> {

    return new PageResult(
      page.items.map(warehouse =>
        WarehouseResponseMapper.toSummary(warehouse),
      ),
      page.page,
      page.pageSize,
      page.totalItems,
    );
  }
}
import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../core/application/search/search-page';

import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { WarehouseEntity } from '../entities/warehouse.entity';

export abstract class WarehouseRepository extends BaseRepository<WarehouseEntity> {
  abstract findByBranchAndCode(
    branchId: string,
    code: string,
  ): Promise<WarehouseEntity | null>;

  abstract search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<WarehouseEntity>>;
}

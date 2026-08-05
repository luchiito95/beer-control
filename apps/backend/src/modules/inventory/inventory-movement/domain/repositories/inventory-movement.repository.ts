import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../core/application/search/search-page';

import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { InventoryMovementEntity } from '../entities/inventory-movement.entity';

export abstract class InventoryMovementRepository
  extends BaseRepository<InventoryMovementEntity> {

  abstract search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<InventoryMovementEntity>>;

}
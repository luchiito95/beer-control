import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';
import { WarehouseEntity } from '../entities/warehouse.entity';

export abstract class WarehouseRepository extends BaseRepository<WarehouseEntity> {

  abstract findByBranchAndCode(
    branchId: string,
    code: string,
  ): Promise<WarehouseEntity | null>;

}
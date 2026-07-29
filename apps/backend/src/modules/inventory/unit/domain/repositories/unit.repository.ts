import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { UnitEntity } from '../entities/unit.entity';

export abstract class UnitRepository
  extends BaseRepository<UnitEntity> {

  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<UnitEntity | null>;
}
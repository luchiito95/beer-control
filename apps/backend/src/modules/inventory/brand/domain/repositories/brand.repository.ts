import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { BrandEntity } from '../entities/brand.entity';

export abstract class BrandRepository
  extends BaseRepository<BrandEntity> {

  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<BrandEntity | null>;
}
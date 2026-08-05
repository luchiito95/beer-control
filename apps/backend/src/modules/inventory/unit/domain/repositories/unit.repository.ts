import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../core/application/search/search-page';

import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { UnitEntity } from '../entities/unit.entity';

export abstract class UnitRepository extends BaseRepository<UnitEntity> {
  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<UnitEntity | null>;

  abstract search(criteria: SearchCriteria): Promise<SearchPage<UnitEntity>>;
}

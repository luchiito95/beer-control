import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../core/application/search/search-page';

import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { Company } from '../entities/company.entity';

export abstract class CompanyRepository extends BaseRepository<Company> {
  abstract findByTaxId(taxId: string | null): Promise<Company | null>;

  abstract search(criteria: SearchCriteria): Promise<SearchPage<Company>>;
}

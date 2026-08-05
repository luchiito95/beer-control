import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../core/application/search/search-page';

import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository extends BaseRepository<ProductEntity> {
  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<ProductEntity | null>;

  abstract search(criteria: SearchCriteria): Promise<SearchPage<ProductEntity>>;
}

import { DeleteBrandCommand } from '../../application/delete-brand/delete-brand.command';

import { GetBrandQuery } from '../../application/queries/get-brand/get-brand.query';
import { SearchBrandsQuery } from '../../application/queries/search-brands/search-brands.query';

import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

export class BrandQueryMapper {
  static toGet(id: string): GetBrandQuery {
    return new GetBrandQuery(id);
  }

  static toDelete(id: string): DeleteBrandCommand {
    return new DeleteBrandCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchBrandsQuery {
    return new SearchBrandsQuery(criteria);
  }
}

import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteCompanyCommand } from '../../application/delete-company/delete-company.command';

import { GetCompanyQuery } from '../../application/queries/get-company/get-company.query';
import { SearchCompaniesQuery } from '../../application/queries/search-companies/search-companies.query';

export class CompanyQueryMapper {
  static toGet(id: string): GetCompanyQuery {
    return new GetCompanyQuery(id);
  }

  static toDelete(id: string): DeleteCompanyCommand {
    return new DeleteCompanyCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchCompaniesQuery {
    return new SearchCompaniesQuery(criteria);
  }
}

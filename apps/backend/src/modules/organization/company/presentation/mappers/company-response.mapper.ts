import { SearchPage } from '../../../../../core/application/search/search-page';

import { Company } from '../../domain/entities/company.entity';

import { GetCompanyResult } from '../../application/queries/get-company/get-company.result';
import { CompanySummaryResult } from '../../application/queries/search-companies/company-summary.result';

export class CompanyResponseMapper {
  static toGet(company: Company): GetCompanyResult {
    return new GetCompanyResult(
      company.id,

      company.name,

      company.legalName,

      company.taxId,

      company.email,

      company.phone,

      company.currencyCode,

      company.timezone,

      company.status,

      company.createdAt,

      company.updatedAt,
    );
  }

  static toSummary(company: Company): CompanySummaryResult {
    return new CompanySummaryResult(
      company.id,

      company.name,

      company.legalName,

      company.taxId,

      company.email,

      company.currencyCode,

      company.timezone,

      company.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<Company>,
  ): SearchPage<CompanySummaryResult> {
    return new SearchPage({
      items: page.items.map((company) =>
        CompanyResponseMapper.toSummary(company),
      ),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

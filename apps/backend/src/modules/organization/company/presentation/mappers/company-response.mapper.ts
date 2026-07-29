import { PageResult } from '../../../../../core/application/pagination/page-result';

import { Company } from '../../domain/entities/company.entity';

import { CompanySummaryResult } from '../../application/queries/list-companies/list-companies.result';
import { GetCompanyResult } from '../../application/queries/get-company/get-company.result';

export class CompanyResponseMapper {
  static toGetResult(company: Company): GetCompanyResult {
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
      company.status,
    );
  }

  static toSummaryPage(
    page: PageResult<Company>,
  ): PageResult<CompanySummaryResult> {
    return new PageResult(
      page.items.map(company =>
        CompanyResponseMapper.toSummary(company),
      ),
      page.page,
      page.pageSize,
      page.totalItems,
    );
  }
}
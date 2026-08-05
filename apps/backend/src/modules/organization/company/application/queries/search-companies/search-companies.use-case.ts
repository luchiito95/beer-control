import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { CompanyRepository } from '../../../domain/repositories/company.repository';

import { CompanyResponseMapper } from '../../../presentation/mappers/company-response.mapper';

import { CompanySummaryResult } from './company-summary.result';
import { SearchCompaniesQuery } from './search-companies.query';

@Injectable()
export class SearchCompaniesUseCase {
  constructor(private readonly repository: CompanyRepository) {}

  async execute(
    query: SearchCompaniesQuery,
  ): Promise<SearchPage<CompanySummaryResult>> {
    const companies = await this.repository.search(query.criteria);

    return CompanyResponseMapper.toSummarySearch(companies);
  }
}

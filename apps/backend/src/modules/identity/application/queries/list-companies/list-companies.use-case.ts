import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../core/application/pagination/page-result';

import { CompanyRepository } from '../../../domain/repositories/company.repository';

import { CompanyResponseMapper } from '../../../presentation/mappers/company-response.mapper';

import { CompanySummaryResult } from './list-companies.result';
import { ListCompaniesQuery } from './list-companies.query';

@Injectable()
export class ListCompaniesUseCase {
  constructor(
    private readonly repository: CompanyRepository,
  ) {}

  async execute(
    query: ListCompaniesQuery,
  ): Promise<PageResult<CompanySummaryResult>> {

    const companies = await this.repository.findAll(
      query.page,
      query.pageSize,
    );

    return CompanyResponseMapper.toSummaryPage(companies);
  }
}
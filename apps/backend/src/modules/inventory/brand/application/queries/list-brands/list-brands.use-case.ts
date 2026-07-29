import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { BrandRepository } from '../../../domain/repositories/brand.repository';

import { BrandResponseMapper } from '../../../presentation/mappers/brand-response.mapper';

import { BrandSummaryResult } from './brand-summary.result';
import { ListBrandsQuery } from './list-brands.query';

@Injectable()
export class ListBrandsUseCase {
  constructor(
    private readonly repository: BrandRepository,
  ) {}

  async execute(
    query: ListBrandsQuery,
  ): Promise<PageResult<BrandSummaryResult>> {

    const brands =
      await this.repository.findAll(
        query.page,
        query.pageSize,
      );

    return BrandResponseMapper.toSummaryPage(
      brands,
    );
  }
}
import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { BrandRepository } from '../../../domain/repositories/brand.repository';

import { BrandResponseMapper } from '../../../presentation/mappers/brand-response.mapper';

import { BrandSummaryResult } from './brand-summary.result';
import { SearchBrandsQuery } from './search-brands.query';

@Injectable()
export class SearchBrandsUseCase {
  constructor(private readonly repository: BrandRepository) {}

  async execute(
    query: SearchBrandsQuery,
  ): Promise<SearchPage<BrandSummaryResult>> {
    const brands = await this.repository.search(query.criteria);

    return BrandResponseMapper.toSummarySearch(brands);
  }
}

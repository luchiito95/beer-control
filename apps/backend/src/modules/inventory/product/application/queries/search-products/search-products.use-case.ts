import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { ProductRepository } from '../../../domain/repositories/product.repository';

import { ProductResponseMapper } from '../../../presentation/mappers/product-response.mapper';

import { ProductSummaryResult } from './product-summary.result';
import { SearchProductsQuery } from './search-products.query';

@Injectable()
export class SearchProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    query: SearchProductsQuery,
  ): Promise<SearchPage<ProductSummaryResult>> {
    const page = await this.repository.search(query.criteria);

    return ProductResponseMapper.toSummaryPage(page);
  }
}

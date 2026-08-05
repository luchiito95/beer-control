import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { CategoryRepository } from '../../../domain/repositories/category.repository';

import { CategoryResponseMapper } from '../../../presentation/mappers/category-response.mapper';

import { CategorySummaryResult } from './category-summary.result';
import { SearchCategoriesQuery } from './search-categories.query';

@Injectable()
export class SearchCategoriesUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(
    query: SearchCategoriesQuery,
  ): Promise<SearchPage<CategorySummaryResult>> {
    const categories = await this.repository.search(query.criteria);

    return CategoryResponseMapper.toSummarySearch(categories);
  }
}

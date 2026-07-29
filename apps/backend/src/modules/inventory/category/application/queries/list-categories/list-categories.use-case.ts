import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { CategoryRepository } from '../../../domain/repositories/category.repository';

import { CategoryResponseMapper } from '../../../presentation/mappers/category-response.mapper';

import { CategorySummaryResult } from './category-summary.result';
import { ListCategoriesQuery } from './list-categories.query';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    private readonly repository: CategoryRepository,
  ) {}

  async execute(
    query: ListCategoriesQuery,
  ): Promise<PageResult<CategorySummaryResult>> {

    const categories =
      await this.repository.findAll(
        query.page,
        query.pageSize,
      );

    return CategoryResponseMapper.toSummaryPage(
      categories,
    );
  }
}
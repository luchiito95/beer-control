import { SearchPage } from '../../../../../core/application/search/search-page';

import { CategoryEntity } from '../../domain/entities/category.entity';

import { GetCategoryResult } from '../../application/queries/get-category/get-category.result';
import { CategorySummaryResult } from '../../application/queries/search-categories/category-summary.result';

export class CategoryResponseMapper {
  static toGetResult(category: CategoryEntity): GetCategoryResult {
    return new GetCategoryResult(
      category.id,

      category.companyId,

      category.code,

      category.name,

      category.description,

      category.status,

      category.createdAt,

      category.updatedAt,
    );
  }

  static toSummary(category: CategoryEntity): CategorySummaryResult {
    return new CategorySummaryResult(
      category.id,

      category.companyId,

      category.code,

      category.name,

      category.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<CategoryEntity>,
  ): SearchPage<CategorySummaryResult> {
    return new SearchPage({
      items: page.items.map((category) =>
        CategoryResponseMapper.toSummary(category),
      ),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

import { PageResult } from '../../../../../core/application/pagination/page-result';

import { CategoryEntity } from '../../domain/entities/category.entity';

import { GetCategoryResult } from '../../application/queries/get-category/get-category.result';
import { CategorySummaryResult } from '../../application/queries/list-categories/category-summary.result';

export class CategoryResponseMapper {
  static toGetResult(
    category: CategoryEntity,
  ): GetCategoryResult {

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

  static toSummary(
    category: CategoryEntity,
  ): CategorySummaryResult {

    return new CategorySummaryResult(
      category.id,
      category.companyId,
      category.code,
      category.name,
      category.status,
    );
  }

  static toSummaryPage(
    page: PageResult<CategoryEntity>,
  ): PageResult<CategorySummaryResult> {

    return new PageResult(
      page.items.map(category =>
        CategoryResponseMapper.toSummary(category),
      ),
      page.page,
      page.pageSize,
      page.totalItems,
    );
  }
}
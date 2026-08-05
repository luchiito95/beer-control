import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteCategoryCommand } from '../../application/delete-category/delete-category.command';

import { GetCategoryQuery } from '../../application/queries/get-category/get-category.query';
import { SearchCategoriesQuery } from '../../application/queries/search-categories/search-categories.query';

export class CategoryQueryMapper {
  static toGet(id: string): GetCategoryQuery {
    return new GetCategoryQuery(id);
  }

  static toDelete(id: string): DeleteCategoryCommand {
    return new DeleteCategoryCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchCategoriesQuery {
    return new SearchCategoriesQuery(criteria);
  }
}

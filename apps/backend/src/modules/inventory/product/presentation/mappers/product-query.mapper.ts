import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteProductCommand } from '../../application/delete-product/delete-product.command';

import { GetProductQuery } from '../../application/queries/get-product/get-product.query';
import { SearchProductsQuery } from '../../application/queries/search-products/search-products.query';

export class ProductQueryMapper {
  static toGet(id: string): GetProductQuery {
    return new GetProductQuery(id);
  }

  static toDelete(id: string): DeleteProductCommand {
    return new DeleteProductCommand({
      id,
    });
  }

  static toSearch(criteria: SearchCriteria): SearchProductsQuery {
    return new SearchProductsQuery(criteria);
  }
}

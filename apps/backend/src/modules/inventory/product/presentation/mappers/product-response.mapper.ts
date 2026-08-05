import { SearchPage } from '../../../../../core/application/search/search-page';

import { ProductEntity } from '../../domain/entities/product.entity';

import { GetProductResult } from '../../application/queries/get-product/get-product.result';
import { ProductSummaryResult } from '../../application/queries/search-products/product-summary.result';

export class ProductResponseMapper {
  static toGetResult(product: ProductEntity): GetProductResult {
    const profit = product.salePrice - product.cost;

    const margin =
      product.cost === 0
        ? 0
        : Number(((profit / product.cost) * 100).toFixed(2));

    return new GetProductResult(
      product.id,

      product.companyId,

      product.categoryId,

      product.brandId,

      product.unitId,

      product.code,

      product.sku,

      product.barcode,

      product.name,

      product.description,

      product.purchasePrice,

      product.cost,

      product.salePrice,

      profit,

      margin,

      product.imageUrl,

      product.status,

      product.createdAt,

      product.updatedAt,
    );
  }

  static toSummary(product: ProductEntity): ProductSummaryResult {
    return new ProductSummaryResult(
      product.id,

      product.code,

      product.name,

      product.salePrice,

      product.status,
    );
  }

  static toSummaryPage(
    page: SearchPage<ProductEntity>,
  ): SearchPage<ProductSummaryResult> {
    return new SearchPage({
      items: page.items.map(ProductResponseMapper.toSummary),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

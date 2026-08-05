import { SearchPage } from '../../../../../core/application/search/search-page';

import { BrandEntity } from '../../domain/entities/brand.entity';

import { GetBrandResult } from '../../application/queries/get-brand/get-brand.result';
import { BrandSummaryResult } from '../../application/queries/search-brands/brand-summary.result';

export class BrandResponseMapper {
  static toGetResult(brand: BrandEntity): GetBrandResult {
    return new GetBrandResult(
      brand.id,

      brand.companyId,

      brand.code,

      brand.name,

      brand.description,

      brand.status,

      brand.createdAt,

      brand.updatedAt,
    );
  }

  static toSummary(brand: BrandEntity): BrandSummaryResult {
    return new BrandSummaryResult(
      brand.id,

      brand.companyId,

      brand.code,

      brand.name,

      brand.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<BrandEntity>,
  ): SearchPage<BrandSummaryResult> {
    return new SearchPage({
      items: page.items.map((brand) => BrandResponseMapper.toSummary(brand)),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

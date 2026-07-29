import { PageResult } from '../../../../../core/application/pagination/page-result';

import { BrandEntity } from '../../domain/entities/brand.entity';

import { GetBrandResult } from '../../application/queries/get-brand/get-brand.result';
import { BrandSummaryResult } from '../../application/queries/list-brands/brand-summary.result';

export class BrandResponseMapper {
  static toGetResult(
    brand: BrandEntity,
  ): GetBrandResult {

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

  static toSummary(
    brand: BrandEntity,
  ): BrandSummaryResult {

    return new BrandSummaryResult(
      brand.id,
      brand.companyId,
      brand.code,
      brand.name,
      brand.status,
    );
  }

  static toSummaryPage(
    page: PageResult<BrandEntity>,
  ): PageResult<BrandSummaryResult> {

    return new PageResult(
      page.items.map(brand =>
        BrandResponseMapper.toSummary(brand),
      ),
      page.page,
      page.pageSize,
      page.totalItems,
    );
  }
}
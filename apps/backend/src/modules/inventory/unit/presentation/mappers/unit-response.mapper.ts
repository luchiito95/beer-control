import { SearchPage } from '../../../../../core/application/search/search-page';

import { UnitEntity } from '../../domain/entities/unit.entity';

import { GetUnitResult } from '../../application/queries/get-unit/get-unit.result';
import { UnitSummaryResult } from '../../application/queries/search-units/unit-summary.result';

export class UnitResponseMapper {
  static toGetResult(unit: UnitEntity): GetUnitResult {
    return new GetUnitResult(
      unit.id,

      unit.companyId,

      unit.code,

      unit.name,

      unit.symbol,

      unit.description,

      unit.status,

      unit.createdAt,

      unit.updatedAt,
    );
  }

  static toSummary(unit: UnitEntity): UnitSummaryResult {
    return new UnitSummaryResult(
      unit.id,

      unit.companyId,

      unit.code,

      unit.name,

      unit.symbol,

      unit.status,
    );
  }

  static toSummarySearch(
    page: SearchPage<UnitEntity>,
  ): SearchPage<UnitSummaryResult> {
    return new SearchPage({
      items: page.items.map((unit) => UnitResponseMapper.toSummary(unit)),

      criteria: page.criteria,

      totalItems: page.totalItems,
    });
  }
}

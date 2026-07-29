import { PageResult } from '../../../../../core/application/pagination/page-result';

import { UnitEntity } from '../../domain/entities/unit.entity';

import { GetUnitResult } from '../../application/queries/get-unit/get-unit.result';
import { UnitSummaryResult } from '../../application/queries/list-units/unit-summary.result';

export class UnitResponseMapper {
  static toGetResult(
    unit: UnitEntity,
  ): GetUnitResult {

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

  static toSummary(
    unit: UnitEntity,
  ): UnitSummaryResult {

    return new UnitSummaryResult(
      unit.id,
      unit.companyId,
      unit.code,
      unit.name,
      unit.symbol,
      unit.status,
    );
  }

  static toSummaryPage(
    page: PageResult<UnitEntity>,
  ): PageResult<UnitSummaryResult> {

    return new PageResult(
      page.items.map(unit =>
        UnitResponseMapper.toSummary(unit),
      ),
      page.page,
      page.pageSize,
      page.totalItems,
    );
  }
}
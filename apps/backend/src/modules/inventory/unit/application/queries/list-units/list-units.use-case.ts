import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { UnitRepository } from '../../../domain/repositories/unit.repository';

import { UnitResponseMapper } from '../../../presentation/mappers/unit-response.mapper';

import { UnitSummaryResult } from './unit-summary.result';
import { ListUnitsQuery } from './list-units.query';

@Injectable()
export class ListUnitsUseCase {
  constructor(
    private readonly repository: UnitRepository,
  ) {}

  async execute(
    query: ListUnitsQuery,
  ): Promise<PageResult<UnitSummaryResult>> {

    const units =
      await this.repository.findAll(
        query.page,
        query.pageSize,
      );

    return UnitResponseMapper.toSummaryPage(
      units,
    );
  }
}
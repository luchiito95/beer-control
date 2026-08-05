import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { UnitRepository } from '../../../domain/repositories/unit.repository';

import { UnitResponseMapper } from '../../../presentation/mappers/unit-response.mapper';

import { UnitSummaryResult } from './unit-summary.result';
import { SearchUnitsQuery } from './search-units.query';

@Injectable()
export class SearchUnitsUseCase {
  constructor(private readonly repository: UnitRepository) {}

  async execute(
    query: SearchUnitsQuery,
  ): Promise<SearchPage<UnitSummaryResult>> {
    const units = await this.repository.search(query.criteria);

    return UnitResponseMapper.toSummarySearch(units);
  }
}

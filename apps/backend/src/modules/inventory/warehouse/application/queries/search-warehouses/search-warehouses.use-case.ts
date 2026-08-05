import { Injectable } from '@nestjs/common';

import { SearchPage } from '../../../../../../core/application/search/search-page';

import { WarehouseRepository } from '../../../domain/repositories/warehouse.repository';

import { WarehouseResponseMapper } from '../../../presentation/mappers/warehouse-response.mapper';

import { WarehouseSummaryResult } from './warehouse-summary.result';
import { SearchWarehousesQuery } from './search-warehouses.query';

@Injectable()
export class SearchWarehousesUseCase {
  constructor(private readonly repository: WarehouseRepository) {}

  async execute(
    query: SearchWarehousesQuery,
  ): Promise<SearchPage<WarehouseSummaryResult>> {
    const warehouses = await this.repository.search(query.criteria);

    return WarehouseResponseMapper.toSummarySearch(warehouses);
  }
}

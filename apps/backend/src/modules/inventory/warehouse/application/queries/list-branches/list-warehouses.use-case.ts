import { Injectable } from '@nestjs/common';

import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { WarehouseRepository } from '../../../domain/repositories/warehouse.repository';

import { WarehouseResponseMapper } from '../../../presentation/mappers/warehouse-response.mapper';

import { WarehouseSummaryResult } from './warehouse-summary.result';
import { ListWarehousesQuery } from './list-warehouses.query';

@Injectable()
export class ListWarehousesUseCase {
  constructor(
    private readonly repository: WarehouseRepository,
  ) {}

  async execute(
    query: ListWarehousesQuery,
  ): Promise<PageResult<WarehouseSummaryResult>> {

    const warehouses = await this.repository.findAll(
      query.page,
      query.pageSize,
    );

    return WarehouseResponseMapper.toSummaryPage(
      warehouses,
    );
  }
}
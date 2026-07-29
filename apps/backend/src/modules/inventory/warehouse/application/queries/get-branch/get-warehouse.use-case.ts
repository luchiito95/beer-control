import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { WarehouseRepository } from '../../../domain/repositories/warehouse.repository';

import { GetWarehouseQuery } from './get-warehouse.query';
import { GetWarehouseResult } from './get-warehouse.result';

@Injectable()
export class GetWarehouseUseCase {
  constructor(
    private readonly repository: WarehouseRepository,
  ) {}

  async execute(
    query: GetWarehouseQuery,
  ): Promise<GetWarehouseResult> {

    const warehouse = await this.repository.findById(query.id);

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse '${query.id}' not found.`,
      );
    }

    return new GetWarehouseResult(
      warehouse.id,
      warehouse.branchId,
      warehouse.code,
      warehouse.name,
      warehouse.description,
      warehouse.status,
      warehouse.createdAt,
      warehouse.updatedAt,
    );
  }
}
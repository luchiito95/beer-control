import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  StockRepository,
} from '../../../domain';

import { GetStockQuery } from './get-stock.query';
import { GetStockResult } from './get-stock.result';

@Injectable()
export class GetStockUseCase {

  constructor(

    private readonly repository: StockRepository,

  ) {}

  async execute(
    query: GetStockQuery,
  ): Promise<GetStockResult> {

    const stock =
      await this.repository.findByWarehouseAndProduct(

        query.warehouseId,

        query.productId,

      );

    if (!stock) {

      throw new NotFoundException(
        'Stock not found.',
      );

    }

    return new GetStockResult(

      stock.id,

      stock.warehouseId,

      stock.productId,

      stock.onHand.toNumber(),

      stock.reserved.toNumber(),

      stock.available.toNumber(),

      stock.averageCost.toNumber(),

      stock.status,

    );

  }

}
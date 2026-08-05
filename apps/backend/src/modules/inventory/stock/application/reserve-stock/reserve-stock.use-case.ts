import { Injectable } from '@nestjs/common';

import { Quantity } from '@shared/domain';

import {
  StockRepository,
  StockNotFoundException,
} from '../../domain';

import { ReserveStockCommand } from './reserve-stock.command';
import { ReserveStockResult } from './reserve-stock.result';

@Injectable()
export class ReserveStockUseCase {

  constructor(

    private readonly repository: StockRepository,

  ) {}

  async execute(
    command: ReserveStockCommand,
  ): Promise<ReserveStockResult> {

    const stock =
      await this.repository.findByWarehouseAndProduct(

        command.warehouseId,

        command.productId,

      );

    if (!stock) {

      throw new StockNotFoundException();

    }

    stock.reserve(

      new Quantity(
        command.quantity,
      ),

    );

    const updated =
      await this.repository.update(
        stock,
      );

    return new ReserveStockResult(

      updated.id,

      updated.onHand.toNumber(),

      updated.reserved.toNumber(),

      updated.available.toNumber(),

    );

  }

}
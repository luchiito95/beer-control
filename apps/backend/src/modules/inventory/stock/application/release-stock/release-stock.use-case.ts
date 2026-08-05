import { Injectable } from '@nestjs/common';

import { Quantity } from '@shared/domain';

import {
  StockNotFoundException,
  StockRepository,
} from '../../domain';

import { ReleaseStockCommand } from './release-stock.command';
import { ReleaseStockResult } from './release-stock.result';

@Injectable()
export class ReleaseStockUseCase {

  constructor(

    private readonly repository: StockRepository,

  ) {}

  async execute(
    command: ReleaseStockCommand,
  ): Promise<ReleaseStockResult> {

    const stock =
      await this.repository.findByWarehouseAndProduct(

        command.warehouseId,

        command.productId,

      );

    if (!stock) {

      throw new StockNotFoundException();

    }

    stock.release(

      new Quantity(
        command.quantity,
      ),

    );

    const updated =
      await this.repository.update(
        stock,
      );

    return new ReleaseStockResult(

      updated.id,

      updated.onHand.toNumber(),

      updated.reserved.toNumber(),

      updated.available.toNumber(),

    );

  }

}
import { Injectable } from '@nestjs/common';

import { Quantity } from '@shared/domain';

import {
  InventoryMovementFactory,
  InventoryMovementRepository,
} from '@inventory/inventory-movement/domain';

import {
  StockNotFoundException,
  StockRepository,
} from '../../domain';

import { DecreaseStockCommand } from './decrease-stock.command';
import { DecreaseStockResult } from './decrease-stock.result';

@Injectable()
export class DecreaseStockUseCase {

  constructor(

    private readonly stockRepository: StockRepository,

    private readonly movementRepository: InventoryMovementRepository,

  ) {}

  async execute(
    command: DecreaseStockCommand,
  ): Promise<DecreaseStockResult> {

    const stock =
      await this.stockRepository.findByWarehouseAndProduct(

        command.warehouseId,

        command.productId,

      );

    if (!stock) {

      throw new StockNotFoundException();

    }

    const quantity =
      new Quantity(
        command.quantity,
      );

    const balanceBefore =
      stock.onHand;

    stock.decrease(
      quantity,
    );

    const movement =
      InventoryMovementFactory.sale(

        stock,

        quantity,

        balanceBefore,

        command.performedBy,

        command.referenceId,

        command.notes,

      );

    await this.stockRepository.update(
      stock,
    );

    await this.movementRepository.create(
      movement,
    );

    return new DecreaseStockResult(

      stock.id,

      stock.warehouseId,

      stock.productId,

      stock.onHand.toNumber(),

      stock.reserved.toNumber(),

      stock.available.toNumber(),

    );

  }

}
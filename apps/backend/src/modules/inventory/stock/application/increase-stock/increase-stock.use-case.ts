import { Injectable } from '@nestjs/common';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  InventoryMovementFactory,
  InventoryMovementReason,
  InventoryMovementRepository,
  InventoryMovementSource,
  InventoryMovementType,
} from '@inventory/inventory-movement/domain';

import {
  StockNotFoundException,
  StockRepository,
} from '../../domain';

import { IncreaseStockCommand } from './increase-stock.command';
import { IncreaseStockResult } from './increase-stock.result';

@Injectable()
export class IncreaseStockUseCase {

  constructor(

    private readonly stockRepository: StockRepository,

    private readonly movementRepository: InventoryMovementRepository,

  ) {}

  async execute(
    command: IncreaseStockCommand,
  ): Promise<IncreaseStockResult> {

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

    const unitCost =
      new Money(
        command.unitCost,
      );

    const balanceBefore =
      stock.onHand;

    stock.increase(

      quantity,

      unitCost,

    );

    const movement =
  InventoryMovementFactory.purchase(

    stock,

    quantity,

    balanceBefore,

    unitCost,

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

    return new IncreaseStockResult(

      stock.id!,

      stock.onHand.toNumber(),

      stock.reserved.toNumber(),

      stock.available.toNumber(),

      stock.averageCost.toNumber(),

      stock.status,

    );

  }

}
import { Injectable } from '@nestjs/common';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  InventoryMovementFactory,
  InventoryMovementRepository,
} from '@inventory/inventory-movement/domain';

import {
  StockFactory,
  StockNotFoundException,
  StockRepository,
} from '../../domain';

import { TransferStockCommand } from './transfer-stock.command';
import { TransferStockResult } from './transfer-stock.result';

@Injectable()
export class TransferStockUseCase {

  constructor(

    private readonly stockRepository: StockRepository,

    private readonly movementRepository: InventoryMovementRepository,

  ) {}

  async execute(
    command: TransferStockCommand,
  ): Promise<TransferStockResult> {

    const source =
      await this.stockRepository.findByWarehouseAndProduct(

        command.sourceWarehouseId,

        command.productId,

      );

    if (!source) {

      throw new StockNotFoundException();

    }

    let destination =
      await this.stockRepository.findByWarehouseAndProduct(

        command.destinationWarehouseId,

        command.productId,

      );

    if (!destination) {

      destination =
        StockFactory.create(

          command.destinationWarehouseId,

          command.productId,

        );

      destination =
        await this.stockRepository.create(
          destination,
        );

    }

    const quantity =
      new Quantity(
        command.quantity,
      );

    const sourceBalance =
      source.onHand;

    const destinationBalance =
      destination.onHand;

    source.decrease(
      quantity,
    );

    destination.increase(

      quantity,

      source.averageCost,

    );

    const transferOut =
      InventoryMovementFactory.transferOut(

        source,

        quantity,

        sourceBalance,

        command.performedBy,

        command.referenceId,

        command.notes,

      );

    const transferIn =
      InventoryMovementFactory.transferIn(

        destination,

        quantity,

        destinationBalance,

        source.averageCost,

        command.performedBy,

        command.referenceId,

        command.notes,

      );

    await this.stockRepository.update(
      source,
    );

    await this.stockRepository.update(
      destination,
    );

    await this.movementRepository.create(
      transferOut,
    );

    await this.movementRepository.create(
      transferIn,
    );

    return new TransferStockResult(

      source.id,

      destination.id,

      quantity.toNumber(),

    );

  }

}
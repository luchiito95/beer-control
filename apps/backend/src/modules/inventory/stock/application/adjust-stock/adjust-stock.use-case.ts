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
    StockNotFoundException,
    StockRepository,
} from '../../domain';

import { AdjustStockCommand } from './adjust-stock.command';
import { AdjustStockResult } from './adjust-stock.result';

@Injectable()
export class AdjustStockUseCase {

    constructor(

        private readonly stockRepository: StockRepository,

        private readonly movementRepository: InventoryMovementRepository,

    ) { }

    async execute(
        command: AdjustStockCommand,
    ): Promise<AdjustStockResult> {

        const stock =
            await this.stockRepository.findByWarehouseAndProduct(

                command.warehouseId,

                command.productId,

            );

        if (!stock) {

            throw new StockNotFoundException();

        }

        const counted =
            new Quantity(
                command.countedQuantity,
            );

        const balanceBefore =
            stock.onHand;

        const unitCost =
            new Money(
                command.unitCost,
            );

        if (
            counted.greaterThan(
                stock.onHand,
            )
        ) {

            const difference =
                counted.minus(
                    stock.onHand,
                );

            stock.increase(

                difference,

                unitCost,

            );

            const movement =
                InventoryMovementFactory.adjustmentIncrease(

                    stock,

                    difference,

                    balanceBefore,

                    unitCost,

                    command.performedBy,

                    null,

                    command.notes,

                );

            await this.movementRepository.create(
                movement,
            );

        }

        else if (
            counted.lessThan(
                stock.onHand,
            )
        ) {

            const difference =
                stock.onHand.minus(
                    counted,
                );

            stock.decrease(
                difference,
            );

            const movement =
                InventoryMovementFactory.adjustmentDecrease(

                    stock,

                    difference,

                    balanceBefore,

                    stock.averageCost,

                    command.performedBy,

                    null,

                    command.notes,

                );

            await this.movementRepository.create(
                movement,
            );

        }

        await this.stockRepository.update(
            stock,
        );

        return new AdjustStockResult(

            stock.id,

            stock.onHand.toNumber(),

            stock.reserved.toNumber(),

            stock.available.toNumber(),

        );

    }

}
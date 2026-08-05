import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InventoryMovementRepository,
} from '../../../domain';

import { GetInventoryMovementQuery } from './get-inventory-movement.query';
import { GetInventoryMovementResult } from './get-inventory-movement.result';

@Injectable()
export class GetInventoryMovementUseCase {

  constructor(

    private readonly repository: InventoryMovementRepository,

  ) {}

  async execute(
    query: GetInventoryMovementQuery,
  ): Promise<GetInventoryMovementResult> {

    const movement =
      await this.repository.findById(
        query.id,
      );

    if (!movement) {

      throw new NotFoundException(
        'Inventory movement not found.',
      );

    }

    return new GetInventoryMovementResult(

      movement.id,

      movement.stockId,

      movement.warehouseId,

      movement.productId,

      movement.type,

      movement.reason,

      movement.source,

      movement.quantity.toNumber(),

      movement.balanceBefore.toNumber(),

      movement.balanceAfter.toNumber(),

      movement.unitCost.toNumber(),

      movement.totalCost.toNumber(),

      movement.performedBy,

      movement.performedAt,

      movement.referenceId,

      movement.notes,

    );

  }

}
import {
  GetInventoryMovementResult,
} from '../../application';

import {
  InventoryMovementResponse,
} from '../dto/responses';

export class InventoryMovementResponseMapper {

  static fromResult(
    result: GetInventoryMovementResult,
  ): InventoryMovementResponse {

    return {

      id: result.id,

      stockId: result.stockId,

      warehouseId: result.warehouseId,

      productId: result.productId,

      type: result.type,

      reason: result.reason,

      source: result.source,

      quantity: result.quantity,

      balanceBefore: result.balanceBefore,

      balanceAfter: result.balanceAfter,

      unitCost: result.unitCost,

      totalCost: result.totalCost,

      performedBy: result.performedBy,

      performedAt: result.performedAt,

      referenceId: result.referenceId,

      notes: result.notes,

    };

  }

}
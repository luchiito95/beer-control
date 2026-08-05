import { randomUUID } from 'crypto';

import {
  Money,
  Quantity,
} from '@shared/domain';

import { StockEntity } from '@inventory/stock/domain';

import {
  InventoryMovementEntity,
  InventoryMovementProps,
} from '../entities';

import {
  InventoryMovementReason,
  InventoryMovementSource,
  InventoryMovementType,
} from '../enums';

export class InventoryMovementFactory {

  static purchase(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    unitCost: Money,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.PURCHASE,

      reason: InventoryMovementReason.PURCHASE,

      source: InventoryMovementSource.PURCHASE_ORDER,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  static sale(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.SALE,

      reason: InventoryMovementReason.SALE,

      source: InventoryMovementSource.SALES_ORDER,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost: stock.averageCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  static adjustmentIncrease(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    unitCost: Money,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.ADJUSTMENT,

      reason: InventoryMovementReason.MANUAL,

      source: InventoryMovementSource.STOCK_ADJUSTMENT,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  static adjustmentDecrease(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    unitCost: Money,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.ADJUSTMENT,

      reason: InventoryMovementReason.MANUAL,

      source: InventoryMovementSource.STOCK_ADJUSTMENT,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  static transferIn(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    unitCost: Money,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.TRANSFER_IN,

      reason: InventoryMovementReason.TRANSFER,

      source: InventoryMovementSource.STOCK_TRANSFER,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  static transferOut(
    stock: StockEntity,
    quantity: Quantity,
    balanceBefore: Quantity,
    performedBy: string,
    referenceId: string | null = null,
    notes: string | null = null,
  ): InventoryMovementEntity {

    return this.create({

      stock,

      type: InventoryMovementType.TRANSFER_OUT,

      reason: InventoryMovementReason.TRANSFER,

      source: InventoryMovementSource.STOCK_TRANSFER,

      quantity,

      balanceBefore,

      balanceAfter: stock.onHand,

      unitCost: stock.averageCost,

      performedBy,

      referenceId,

      notes,

    });

  }

  private static create(params: {

    stock: StockEntity;

    type: InventoryMovementType;

    reason: InventoryMovementReason;

    source: InventoryMovementSource;

    quantity: Quantity;

    balanceBefore: Quantity;

    balanceAfter: Quantity;

    unitCost: Money;

    performedBy: string;

    referenceId: string | null;

    notes: string | null;

  }): InventoryMovementEntity {

    const now = new Date();

    const props: InventoryMovementProps = {

      id: randomUUID(),

      stockId: params.stock.id,

      warehouseId: params.stock.warehouseId,

      productId: params.stock.productId,

      type: params.type,

      reason: params.reason,

      source: params.source,

      referenceId: params.referenceId,

      quantity: params.quantity,

      balanceBefore: params.balanceBefore,

      balanceAfter: params.balanceAfter,

      unitCost: params.unitCost,

      performedBy: params.performedBy,

      performedAt: now,

      notes: params.notes,

      createdAt: now,

      updatedAt: now,

      deletedAt: null,

    };

    return new InventoryMovementEntity(props);

  }

}
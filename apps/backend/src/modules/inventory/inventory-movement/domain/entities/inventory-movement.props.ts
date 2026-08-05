import { BaseEntityProps } from '../../../../../core/domain/entities';

import {
  Money,
  Quantity,
} from '../../../../shared/domain';

import {
  InventoryMovementReason,
  InventoryMovementSource,
  InventoryMovementType,
} from '../enums';

export interface InventoryMovementProps
  extends BaseEntityProps {

  stockId: string;

  warehouseId: string;

  productId: string;

  type: InventoryMovementType;

  reason: InventoryMovementReason;

  source: InventoryMovementSource;

  referenceId: string | null;

  quantity: Quantity;

  balanceBefore: Quantity;

  balanceAfter: Quantity;

  unitCost: Money;

  performedBy: string;

  performedAt: Date;

  notes: string | null;

}
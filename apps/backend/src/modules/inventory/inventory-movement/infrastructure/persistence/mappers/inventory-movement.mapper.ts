import {
  InventoryMovement,
  InventoryMovementReason as PrismaInventoryMovementReason,
  InventoryMovementSource as PrismaInventoryMovementSource,
  InventoryMovementType as PrismaInventoryMovementType,
  Prisma,
} from '@prisma/client';

import { mapEnum } from '@core/infrastructure/mappers/enum.mapper';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  InventoryMovementEntity,
  InventoryMovementProps,
  InventoryMovementReason,
  InventoryMovementSource,
  InventoryMovementType,
} from '@inventory/inventory-movement/domain';

export class InventoryMovementMapper {

  static toDomain(
    movement: InventoryMovement,
  ): InventoryMovementEntity {

    const props: InventoryMovementProps = {

      id: movement.id,

      stockId: movement.stockId,

      warehouseId: movement.warehouseId,

      productId: movement.productId,

      type: mapEnum<InventoryMovementType>(
        movement.type,
      ),

      reason: mapEnum<InventoryMovementReason>(
        movement.reason,
      ),

      source: mapEnum<InventoryMovementSource>(
        movement.source,
      ),

      referenceId: movement.referenceId,

      quantity: new Quantity(
        movement.quantity,
      ),

      balanceBefore: new Quantity(
        movement.balanceBefore,
      ),

      balanceAfter: new Quantity(
        movement.balanceAfter,
      ),

      unitCost: new Money(
        movement.unitCost,
      ),

      performedBy: movement.performedBy,

      performedAt: movement.performedAt,

      notes: movement.notes,

      createdAt: movement.createdAt,

      updatedAt: movement.updatedAt,

      deletedAt: movement.deletedAt,

    };

    return new InventoryMovementEntity(
      props,
    );

  }

  static toCreate(
    movement: InventoryMovementEntity,
  ): Prisma.InventoryMovementCreateInput {

    return {

      stock: {

        connect: {

          id: movement.stockId,

        },

      },

      warehouse: {

        connect: {

          id: movement.warehouseId,

        },

      },

      product: {

        connect: {

          id: movement.productId,

        },

      },

      type: mapEnum<PrismaInventoryMovementType>(
        movement.type,
      ),

      reason: mapEnum<PrismaInventoryMovementReason>(
        movement.reason,
      ),

      source: mapEnum<PrismaInventoryMovementSource>(
        movement.source,
      ),

      referenceId: movement.referenceId,

      quantity: new Prisma.Decimal(
        movement.quantity.toString(),
      ),

      balanceBefore: new Prisma.Decimal(
        movement.balanceBefore.toString(),
      ),

      balanceAfter: new Prisma.Decimal(
        movement.balanceAfter.toString(),
      ),

      unitCost: new Prisma.Decimal(
        movement.unitCost.toString(),
      ),

      performedBy: movement.performedBy,

      performedAt: movement.performedAt,

      notes: movement.notes,

    };

  }

}
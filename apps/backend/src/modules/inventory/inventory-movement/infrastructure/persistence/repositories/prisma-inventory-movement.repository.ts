import { Injectable } from '@nestjs/common';

import {
  SearchCriteria,
  SearchPage,
} from '@core/application/search';

import { PrismaService } from '@database/prisma';

import {
  InventoryMovementEntity,
  InventoryMovementRepository,
} from '@inventory/inventory-movement/domain';

import { InventoryMovementMapper } from '../mappers';

@Injectable()
export class PrismaInventoryMovementRepository
  implements InventoryMovementRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    movement: InventoryMovementEntity,
  ): Promise<InventoryMovementEntity> {

    const created =
      await this.prisma.inventoryMovement.create({

        data:
          InventoryMovementMapper.toCreate(
            movement,
          ),

      });

    return InventoryMovementMapper.toDomain(
      created,
    );

  }

  async findById(
    id: string,
  ): Promise<InventoryMovementEntity | null> {

    const movement =
      await this.prisma.inventoryMovement.findUnique({

        where: { id },

      });

    return movement
      ? InventoryMovementMapper.toDomain(
          movement,
        )
      : null;

  }

  async search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<InventoryMovementEntity>> {

    const totalItems =
      await this.prisma.inventoryMovement.count({

        where: {

          deletedAt: null,

        },

      });

    const rows =
      await this.prisma.inventoryMovement.findMany({

        where: {

          deletedAt: null,

        },

        skip:
          (criteria.page - 1) *
          criteria.pageSize,

        take:
          criteria.pageSize,

        orderBy: {

          performedAt: 'desc',

        },

      });

    return new SearchPage({

      items: rows.map(
        InventoryMovementMapper.toDomain,
      ),

      criteria,

      totalItems,

    });

  }

  async update(
    movement: InventoryMovementEntity,
  ): Promise<InventoryMovementEntity> {

    const updated =
      await this.prisma.inventoryMovement.update({

        where: {

          id: movement.id!,

        },

        data: {

          notes: movement.notes,

        },

      });

    return InventoryMovementMapper.toDomain(
      updated,
    );

  }

  async softDelete(
    id: string,
  ): Promise<void> {

    await this.prisma.inventoryMovement.update({

      where: {

        id,

      },

      data: {

        deletedAt: new Date(),

      },

    });

  }

  async findByStock(
    stockId: string,
  ): Promise<InventoryMovementEntity[]> {

    const rows =
      await this.prisma.inventoryMovement.findMany({

        where: {

          stockId,

          deletedAt: null,

        },

        orderBy: {

          performedAt: 'desc',

        },

      });

    return rows.map(
      InventoryMovementMapper.toDomain,
    );

  }

  async findByWarehouse(
    warehouseId: string,
  ): Promise<InventoryMovementEntity[]> {

    const rows =
      await this.prisma.inventoryMovement.findMany({

        where: {

          warehouseId,

          deletedAt: null,

        },

        orderBy: {

          performedAt: 'desc',

        },

      });

    return rows.map(
      InventoryMovementMapper.toDomain,
    );

  }

  async findByProduct(
    productId: string,
  ): Promise<InventoryMovementEntity[]> {

    const rows =
      await this.prisma.inventoryMovement.findMany({

        where: {

          productId,

          deletedAt: null,

        },

        orderBy: {

          performedAt: 'desc',

        },

      });

    return rows.map(
      InventoryMovementMapper.toDomain,
    );

  }

}
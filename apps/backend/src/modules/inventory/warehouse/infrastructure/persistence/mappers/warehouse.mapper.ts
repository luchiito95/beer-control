import {
  Prisma,
  Warehouse as PrismaWarehouse,
  WarehouseStatus as PrismaWarehouseStatus,
} from '@prisma/client';

import { WarehouseEntity } from '../../../domain/entities/warehouse.entity';
import { WarehouseStatus } from '../../../domain/enums/warehouse-status.enum';

export class WarehouseMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(prismaWarehouse: PrismaWarehouse): WarehouseEntity {
    return new WarehouseEntity({
      id: prismaWarehouse.id,
      branchId: prismaWarehouse.branchId,
      code: prismaWarehouse.code,
      name: prismaWarehouse.name,
      description: prismaWarehouse.description,
      status: this.toDomainStatus(prismaWarehouse.status),
      createdAt: prismaWarehouse.createdAt,
      updatedAt: prismaWarehouse.updatedAt,
      deletedAt: prismaWarehouse.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(warehouse: WarehouseEntity): Prisma.WarehouseCreateInput {
    return {
      branch: {
        connect: {
          id: warehouse.branchId,
        },
      },
      code: warehouse.code,
      name: warehouse.name,
      description: warehouse.description,
      status: this.toPrismaStatus(warehouse.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(warehouse: WarehouseEntity): Prisma.WarehouseUpdateInput {
    return {
      code: warehouse.code,
      name: warehouse.name,
      description: warehouse.description,
      status: this.toPrismaStatus(warehouse.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(
    status: PrismaWarehouseStatus,
  ): WarehouseStatus {
    switch (status) {
      case PrismaWarehouseStatus.ACTIVE:
        return WarehouseStatus.ACTIVE;

      case PrismaWarehouseStatus.INACTIVE:
        return WarehouseStatus.INACTIVE;

      default:
        throw new Error(`Unknown warehouse status: ${status}`);
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(
    status: WarehouseStatus,
  ): PrismaWarehouseStatus {
    switch (status) {
      case WarehouseStatus.ACTIVE:
        return PrismaWarehouseStatus.ACTIVE;

      case WarehouseStatus.INACTIVE:
        return PrismaWarehouseStatus.INACTIVE;

      default:
        throw new Error(`Unknown warehouse status: ${status}`);
    }
  }
}

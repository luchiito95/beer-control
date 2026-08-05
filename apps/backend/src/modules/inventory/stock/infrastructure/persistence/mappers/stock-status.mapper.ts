import { StockStatus as PrismaStockStatus } from '@prisma/client';

import { StockStatus } from '../../../domain/enums';

export class StockStatusMapper {

  static toDomain(
    status: PrismaStockStatus,
  ): StockStatus {

    switch (status) {

      case PrismaStockStatus.ACTIVE:
        return StockStatus.ACTIVE;

      case PrismaStockStatus.INACTIVE:
        return StockStatus.INACTIVE;

      default:
        throw new Error(
          `Unknown StockStatus: ${status}`,
        );

    }

  }

  static toPersistence(
    status: StockStatus,
  ): PrismaStockStatus {

    switch (status) {

      case StockStatus.ACTIVE:
        return PrismaStockStatus.ACTIVE;

      case StockStatus.INACTIVE:
        return PrismaStockStatus.INACTIVE;

      default:
        throw new Error(
          `Unknown StockStatus: ${status}`,
        );

    }

  }

}
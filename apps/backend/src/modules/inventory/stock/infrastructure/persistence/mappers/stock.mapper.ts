import {
  Prisma,
  Stock,
  StockStatus as PrismaStockStatus,
} from '@prisma/client';

import { mapEnum } from '@core/infrastructure/mappers/enum.mapper';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  StockEntity,
  StockProps,
  StockStatus,
} from '@inventory/stock/domain';

export class StockMapper {

  static toDomain(
    stock: Stock,
  ): StockEntity {

    const props: StockProps = {

      id: stock.id,

      warehouseId: stock.warehouseId,

      productId: stock.productId,

      onHand: new Quantity(
        stock.onHand,
      ),

      reserved: new Quantity(
        stock.reserved,
      ),

      averageCost: new Money(
        stock.averageCost,
      ),

      status: mapEnum<StockStatus>(
        stock.status,
      ),

      createdAt: stock.createdAt,

      updatedAt: stock.updatedAt,

      deletedAt: stock.deletedAt,

    };

    return new StockEntity(
      props,
    );

  }

  static toCreate(
    stock: StockEntity,
  ): Prisma.StockCreateInput {

    return {

      warehouse: {

        connect: {

          id: stock.warehouseId,

        },

      },

      product: {

        connect: {

          id: stock.productId,

        },

      },

      onHand: new Prisma.Decimal(
        stock.onHand.toString(),
      ),

      reserved: new Prisma.Decimal(
        stock.reserved.toString(),
      ),

      averageCost: new Prisma.Decimal(
        stock.averageCost.toString(),
      ),

      status: mapEnum<PrismaStockStatus>(
        stock.status,
      ),

    };

  }

  static toUpdate(
    stock: StockEntity,
  ): Prisma.StockUpdateInput {

    return {

      onHand: new Prisma.Decimal(
        stock.onHand.toString(),
      ),

      reserved: new Prisma.Decimal(
        stock.reserved.toString(),
      ),

      averageCost: new Prisma.Decimal(
        stock.averageCost.toString(),
      ),

      status: mapEnum<PrismaStockStatus>(
        stock.status,
      ),

      deletedAt: stock.deletedAt,

    };

  }

}
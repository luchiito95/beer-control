import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';

import { PrismaBaseRepository } from '../../../../../../core/database/repositories/base.repository';

import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { StockEntity } from '../../../domain/entities/stock.entity';
import { StockRepository } from '../../../domain/repositories/stock.repository';

import { StockMapper } from '../mappers/stock.mapper';

@Injectable()
export class PrismaStockRepository
  extends PrismaBaseRepository
  implements StockRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    stock: StockEntity,
  ): Promise<StockEntity> {

    const created =
      await this.prisma.stock.create({

        data: StockMapper.toCreate(
          stock,
        ),

      });

    return StockMapper.toDomain(
      created,
    );

  }

  async findById(
    id: string,
  ): Promise<StockEntity | null> {

    const stock =
      await this.prisma.stock.findFirst({

        where: {

          id,

          deletedAt: null,

        },

      });

    return stock
      ? StockMapper.toDomain(
        stock,
      )
      : null;

  }

  async findAll(): Promise<never> {

    throw new Error(
      'findAll() is not supported. Use search().',
    );

  }

  async search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<StockEntity>> {

    return this.executeSearch(

      this.prisma.stock,

      criteria,

      (stock) =>
        StockMapper.toDomain(
          stock,
        ),

    );

  }

  async findByWarehouseAndProduct(
    warehouseId: string,
    productId: string,
  ): Promise<StockEntity | null> {

    const stock =
      await this.prisma.stock.findUnique({

        where: {

          warehouseId_productId: {

            warehouseId,

            productId,

          },

        },

      });

    if (!stock) {
      return null;
    }

    return StockMapper.toDomain(
      stock,
    );

  }

  async update(
    stock: StockEntity,
  ): Promise<StockEntity> {

    const updated =
      await this.prisma.stock.update({

        where: {

          id: stock.id,

        },

        data: StockMapper.toUpdate(
          stock,
        ),

      });

    return StockMapper.toDomain(
      updated,
    );

  }

  async softDelete(
    id: string,
  ): Promise<void> {

    await this.prisma.stock.update({

      where: {

        id,

      },

      data: {

        deletedAt: new Date(),

      },

    });

  }

}
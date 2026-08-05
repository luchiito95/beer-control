import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';

import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { WarehouseEntity } from '../../../domain/entities/warehouse.entity';
import { WarehouseRepository } from '../../../domain/repositories/warehouse.repository';

import { WarehouseMapper } from '../mappers/warehouse.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaWarehouseRepository extends WarehouseRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(warehouse: WarehouseEntity): Promise<WarehouseEntity> {
    const created = await this.prisma.warehouse.create({
      data: WarehouseMapper.toCreate(warehouse),
    });

    return WarehouseMapper.toDomain(created);
  }

  async findById(id: string): Promise<WarehouseEntity | null> {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: {
        id,

        deletedAt: null,
      },
    });

    return warehouse ? WarehouseMapper.toDomain(warehouse) : null;
  }

  async search(criteria: SearchCriteria): Promise<SearchPage<WarehouseEntity>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [warehouses, totalItems] = await Promise.all([
      this.prisma.warehouse.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.warehouse.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: warehouses.map((warehouse) => WarehouseMapper.toDomain(warehouse)),

      criteria,

      totalItems,
    });
  }

  async findByBranchAndCode(
    branchId: string,
    code: string,
  ): Promise<WarehouseEntity | null> {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: {
        branchId,

        code,

        deletedAt: null,
      },
    });

    return warehouse ? WarehouseMapper.toDomain(warehouse) : null;
  }

  async update(warehouse: WarehouseEntity): Promise<WarehouseEntity> {
    const updated = await this.prisma.warehouse.update({
      where: {
        id: warehouse.id,
      },

      data: WarehouseMapper.toUpdate(warehouse),
    });

    return WarehouseMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.warehouse.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}

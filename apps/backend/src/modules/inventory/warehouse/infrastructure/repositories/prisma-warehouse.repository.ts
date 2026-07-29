import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../core/application/pagination/page-result';
import { PrismaService } from '../../../../../database/prisma/prisma.service';

import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import { WarehouseRepository } from '../../domain/repositories/warehouse.repository';
import { WarehouseMapper } from '../persistence/mappers/warehouse.mapper';



@Injectable()
export class PrismaWarehouseRepository extends WarehouseRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    warehouse: WarehouseEntity,
  ): Promise<WarehouseEntity> {
    const created = await this.prisma.warehouse.create({
      data: WarehouseMapper.toCreate(warehouse),
    });

    return WarehouseMapper.toDomain(created);
  }

  async findById(
    id: string,
  ): Promise<WarehouseEntity | null> {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return warehouse
      ? WarehouseMapper.toDomain(warehouse)
      : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<WarehouseEntity>> {
    const pagination = new PageRequest(page, pageSize);

    const [warehouses, totalItems] = await this.prisma.$transaction([
      this.prisma.warehouse.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pagination.skip,
        take: pagination.take,
      }),

      this.prisma.warehouse.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return new PageResult(
      warehouses.map(warehouse =>
        WarehouseMapper.toDomain(warehouse),
      ),
      page,
      pageSize,
      totalItems,
    );
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

    return warehouse
      ? WarehouseMapper.toDomain(warehouse)
      : null;
  }

  async update(
    warehouse: WarehouseEntity,
  ): Promise<WarehouseEntity> {
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
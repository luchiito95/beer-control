import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../../core/application/pagination/page-result';

import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { UnitEntity } from '../../../domain/entities/unit.entity';
import { UnitRepository } from '../../../domain/repositories/unit.repository';

import { UnitMapper } from '../mappers/unit.mapper';

@Injectable()
export class PrismaUnitRepository
  extends UnitRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    unit: UnitEntity,
  ): Promise<UnitEntity> {

    const created =
      await this.prisma.unit.create({
        data: UnitMapper.toCreate(unit),
      });

    return UnitMapper.toDomain(created);
  }

  async findById(
    id: string,
  ): Promise<UnitEntity | null> {

    const unit =
      await this.prisma.unit.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

    return unit
      ? UnitMapper.toDomain(unit)
      : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<UnitEntity>> {

    const pagination =
      new PageRequest(page, pageSize);

    const [units, totalItems] =
      await this.prisma.$transaction([
        this.prisma.unit.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: pagination.skip,
          take: pagination.take,
        }),

        this.prisma.unit.count({
          where: {
            deletedAt: null,
          },
        }),
      ]);

    return new PageResult(
      units.map(unit =>
        UnitMapper.toDomain(unit),
      ),
      page,
      pageSize,
      totalItems,
    );
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<UnitEntity | null> {

    const unit =
      await this.prisma.unit.findFirst({
        where: {
          companyId,
          code,
          deletedAt: null,
        },
      });

    return unit
      ? UnitMapper.toDomain(unit)
      : null;
  }

  async update(
    unit: UnitEntity,
  ): Promise<UnitEntity> {

    const updated =
      await this.prisma.unit.update({
        where: {
          id: unit.id,
        },
        data: UnitMapper.toUpdate(unit),
      });

    return UnitMapper.toDomain(updated);
  }

  async softDelete(
    id: string,
  ): Promise<void> {

    await this.prisma.unit.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';


import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { UnitEntity } from '../../../domain/entities/unit.entity';
import { UnitRepository } from '../../../domain/repositories/unit.repository';

import { UnitMapper } from '../mappers/unit.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaUnitRepository extends UnitRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(unit: UnitEntity): Promise<UnitEntity> {
    const created = await this.prisma.unit.create({
      data: UnitMapper.toCreate(unit),
    });

    return UnitMapper.toDomain(created);
  }

  async findById(id: string): Promise<UnitEntity | null> {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id,

        deletedAt: null,
      },
    });

    return unit ? UnitMapper.toDomain(unit) : null;
  }

  async search(criteria: SearchCriteria): Promise<SearchPage<UnitEntity>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [units, totalItems] = await Promise.all([
      this.prisma.unit.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.unit.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: units.map((unit) => UnitMapper.toDomain(unit)),

      criteria,

      totalItems,
    });
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<UnitEntity | null> {
    const unit = await this.prisma.unit.findFirst({
      where: {
        companyId,

        code,

        deletedAt: null,
      },
    });

    return unit ? UnitMapper.toDomain(unit) : null;
  }

  async update(unit: UnitEntity): Promise<UnitEntity> {
    const updated = await this.prisma.unit.update({
      where: {
        id: unit.id,
      },

      data: UnitMapper.toUpdate(unit),
    });

    return UnitMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
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

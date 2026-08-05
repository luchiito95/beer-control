import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';


import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { BrandEntity } from '../../../domain/entities/brand.entity';
import { BrandRepository } from '../../../domain/repositories/brand.repository';

import { BrandMapper } from '../mappers/brand.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaBrandRepository extends BrandRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(brand: BrandEntity): Promise<BrandEntity> {
    const created = await this.prisma.brand.create({
      data: BrandMapper.toCreate(brand),
    });

    return BrandMapper.toDomain(created);
  }

  async findById(id: string): Promise<BrandEntity | null> {
    const brand = await this.prisma.brand.findFirst({
      where: {
        id,

        deletedAt: null,
      },
    });

    return brand ? BrandMapper.toDomain(brand) : null;
  }

  async search(criteria: SearchCriteria): Promise<SearchPage<BrandEntity>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [brands, totalItems] = await Promise.all([
      this.prisma.brand.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.brand.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: brands.map((brand) => BrandMapper.toDomain(brand)),

      criteria,

      totalItems,
    });
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<BrandEntity | null> {
    const brand = await this.prisma.brand.findFirst({
      where: {
        companyId,

        code,

        deletedAt: null,
      },
    });

    return brand ? BrandMapper.toDomain(brand) : null;
  }

  async update(brand: BrandEntity): Promise<BrandEntity> {
    const updated = await this.prisma.brand.update({
      where: {
        id: brand.id,
      },

      data: BrandMapper.toUpdate(brand),
    });

    return BrandMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.brand.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}

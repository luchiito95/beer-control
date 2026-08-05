import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';


import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { CategoryEntity } from '../../../domain/entities/category.entity';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

import { CategoryMapper } from '../mappers/category.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaCategoryRepository extends CategoryRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const created = await this.prisma.category.create({
      data: CategoryMapper.toCreate(category),
    });

    return CategoryMapper.toDomain(created);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,

        deletedAt: null,
      },
    });

    return category ? CategoryMapper.toDomain(category) : null;
  }

  async search(criteria: SearchCriteria): Promise<SearchPage<CategoryEntity>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [categories, totalItems] = await Promise.all([
      this.prisma.category.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.category.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: categories.map((category) => CategoryMapper.toDomain(category)),

      criteria,

      totalItems,
    });
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        companyId,

        code,

        deletedAt: null,
      },
    });

    return category ? CategoryMapper.toDomain(category) : null;
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    const updated = await this.prisma.category.update({
      where: {
        id: category.id,
      },

      data: CategoryMapper.toUpdate(category),
    });

    return CategoryMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.category.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}

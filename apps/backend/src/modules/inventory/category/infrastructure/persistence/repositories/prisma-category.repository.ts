import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../../core/application/pagination/page-result';
import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { CategoryEntity } from '../../../domain/entities/category.entity';
import { CategoryRepository } from '../../../domain/repositories/category.repository';

import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class PrismaCategoryRepository
  extends CategoryRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    const created = await this.prisma.category.create({
      data: CategoryMapper.toCreate(category),
    });

    return CategoryMapper.toDomain(created);
  }

  async findById(
    id: string,
  ): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return category
      ? CategoryMapper.toDomain(category)
      : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<CategoryEntity>> {
    const pagination = new PageRequest(page, pageSize);

    const [categories, totalItems] =
      await this.prisma.$transaction([
        this.prisma.category.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: pagination.skip,
          take: pagination.take,
        }),

        this.prisma.category.count({
          where: {
            deletedAt: null,
          },
        }),
      ]);

    return new PageResult(
      categories.map(category =>
        CategoryMapper.toDomain(category),
      ),
      page,
      pageSize,
      totalItems,
    );
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

    return category
      ? CategoryMapper.toDomain(category)
      : null;
  }

  async update(
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    const updated = await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: CategoryMapper.toUpdate(category),
    });

    return CategoryMapper.toDomain(updated);
  }

  async softDelete(
    id: string,
  ): Promise<void> {
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
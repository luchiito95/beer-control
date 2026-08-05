import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';

import { PrismaBaseRepository } from '../../../../../../core/database/repositories/base.repository';

import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class PrismaProductRepository
  extends PrismaBaseRepository
  implements ProductRepository
{
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const created = await this.prisma.product.create({
      data: ProductMapper.toCreate(product),
    });

    return ProductMapper.toDomain(created);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,

        deletedAt: null,
      },
    });

    return product ? ProductMapper.toDomain(product) : null;
  }

  async findAll(): Promise<never> {
    throw new Error('findAll() is not supported. Use search().');
  }

  async search(criteria: SearchCriteria): Promise<SearchPage<ProductEntity>> {
    return this.executeSearch(
      this.prisma.product,

      criteria,

      (product) => ProductMapper.toDomain(product),
    );
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        companyId,

        code,

        deletedAt: null,
      },
    });

    return product ? ProductMapper.toDomain(product) : null;
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const updated = await this.prisma.product.update({
      where: {
        id: product.id,
      },

      data: ProductMapper.toUpdate(product),
    });

    return ProductMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.product.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}

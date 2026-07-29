import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../../core/application/pagination/page-result';
import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { BrandEntity } from '../../../domain/entities/brand.entity';
import { BrandRepository } from '../../../domain/repositories/brand.repository';

import { BrandMapper } from '../mappers/brand.mapper';

@Injectable()
export class PrismaBrandRepository
  extends BrandRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(
    brand: BrandEntity,
  ): Promise<BrandEntity> {
    const created = await this.prisma.brand.create({
      data: BrandMapper.toCreate(brand),
    });

    return BrandMapper.toDomain(created);
  }

  async findById(
    id: string,
  ): Promise<BrandEntity | null> {
    const brand = await this.prisma.brand.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return brand
      ? BrandMapper.toDomain(brand)
      : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<BrandEntity>> {
    const pagination = new PageRequest(
      page,
      pageSize,
    );

    const [brands, totalItems] =
      await this.prisma.$transaction([
        this.prisma.brand.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: pagination.skip,
          take: pagination.take,
        }),

        this.prisma.brand.count({
          where: {
            deletedAt: null,
          },
        }),
      ]);

    return new PageResult(
      brands.map(brand =>
        BrandMapper.toDomain(brand),
      ),
      page,
      pageSize,
      totalItems,
    );
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

    return brand
      ? BrandMapper.toDomain(brand)
      : null;
  }

  async update(
    brand: BrandEntity,
  ): Promise<BrandEntity> {
    const updated = await this.prisma.brand.update({
      where: {
        id: brand.id,
      },
      data: BrandMapper.toUpdate(brand),
    });

    return BrandMapper.toDomain(updated);
  }

  async softDelete(
    id: string,
  ): Promise<void> {
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
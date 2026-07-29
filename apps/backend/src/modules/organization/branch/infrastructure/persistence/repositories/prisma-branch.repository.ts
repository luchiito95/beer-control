import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../../core/application/pagination/page-result';
import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { BranchEntity } from '../../../domain/entities/branch.entity';
import { BranchRepository } from '../../../domain/repositories/branch.repository';

import { BranchMapper } from '../mappers/branch.mapper';

@Injectable()
export class PrismaBranchRepository extends BranchRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(branch: BranchEntity): Promise<BranchEntity> {
    const created = await this.prisma.branch.create({
      data: BranchMapper.toCreate(branch),
    });

    return BranchMapper.toDomain(created);
  }

  async findById(id: string): Promise<BranchEntity | null> {
    const branch = await this.prisma.branch.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return branch ? BranchMapper.toDomain(branch) : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<BranchEntity>> {
    const pagination = new PageRequest(page, pageSize);

    const [branches, totalItems] = await this.prisma.$transaction([
      this.prisma.branch.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pagination.skip,
        take: pagination.take,
      }),

      this.prisma.branch.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return new PageResult(
      branches.map(branch => BranchMapper.toDomain(branch)),
      page,
      pageSize,
      totalItems,
    );
  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<BranchEntity | null> {
    const branch = await this.prisma.branch.findFirst({
      where: {
        companyId,
        code,
        deletedAt: null,
      },
    });

    return branch ? BranchMapper.toDomain(branch) : null;
  }

  async update(branch: BranchEntity): Promise<BranchEntity> {
    const updated = await this.prisma.branch.update({
      where: {
        id: branch.id,
      },
      data: BranchMapper.toUpdate(branch),
    });

    return BranchMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.branch.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
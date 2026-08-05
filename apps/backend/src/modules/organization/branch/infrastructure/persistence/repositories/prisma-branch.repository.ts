import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';

import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { BranchEntity } from '../../../domain/entities/branch.entity';
import { BranchRepository } from '../../../domain/repositories/branch.repository';

import { BranchMapper } from '../mappers/branch.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaBranchRepository extends BranchRepository {
  constructor(private readonly prisma: PrismaService) {
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

  async search(criteria: SearchCriteria): Promise<SearchPage<BranchEntity>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [branches, totalItems] = await Promise.all([
      this.prisma.branch.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.branch.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: branches.map((branch) => BranchMapper.toDomain(branch)),

      criteria,

      totalItems,
    });
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

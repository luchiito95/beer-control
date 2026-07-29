import { Injectable } from '@nestjs/common';

import { PageRequest } from '../../../../../../core/application/pagination/page-request';
import { PageResult } from '../../../../../../core/application/pagination/page-result';
import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { Company } from '../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../domain/repositories/company.repository';

import { CompanyMapper } from '../mappers/company.mapper';

@Injectable()
export class PrismaCompanyRepository extends CompanyRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async create(company: Company): Promise<Company> {
    const created = await this.prisma.company.create({
      data: CompanyMapper.toCreate(company),
    });

    return CompanyMapper.toDomain(created);
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return company ? CompanyMapper.toDomain(company) : null;
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<PageResult<Company>> {
    const pagination = new PageRequest(page, pageSize);

    const [companies, totalItems] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pagination.skip,
        take: pagination.take,
      }),

      this.prisma.company.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return new PageResult(
      companies.map(company => CompanyMapper.toDomain(company)),
      page,
      pageSize,
      totalItems,
    );
  }

  async findByTaxId(
    taxId: string | null,
  ): Promise<Company | null> {
    if (!taxId) {
      return null;
    }

    const company = await this.prisma.company.findFirst({
      where: {
        taxId,
        deletedAt: null,
      },
    });

    return company ? CompanyMapper.toDomain(company) : null;
  }

  async update(company: Company): Promise<Company> {
    const updated = await this.prisma.company.update({
      where: {
        id: company.id,
      },
      data: CompanyMapper.toUpdate(company),
    });

    return CompanyMapper.toDomain(updated);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.company.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
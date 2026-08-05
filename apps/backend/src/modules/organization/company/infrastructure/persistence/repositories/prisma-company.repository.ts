import { Injectable } from '@nestjs/common';

import { SearchCriteria } from '../../../../../../core/application/search/search-criteria';
import { SearchPage } from '../../../../../../core/application/search/search-page';


import { PrismaService } from '../../../../../../database/prisma/prisma.service';

import { Company } from '../../../domain/entities/company.entity';
import { CompanyRepository } from '../../../domain/repositories/company.repository';

import { CompanyMapper } from '../mappers/company.mapper';
import { PrismaSearchMapper } from '@database/prisma';

@Injectable()
export class PrismaCompanyRepository extends CompanyRepository {
  constructor(private readonly prisma: PrismaService) {
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

  async search(criteria: SearchCriteria): Promise<SearchPage<Company>> {
    const query = PrismaSearchMapper.toQuery(criteria);

    const [companies, totalItems] = await Promise.all([
      this.prisma.company.findMany({
        where: {
          ...query.where,

          deletedAt: null,
        },

        orderBy: query.orderBy,

        skip: (criteria.page - 1) * criteria.pageSize,

        take: criteria.pageSize,
      }),

      this.prisma.company.count({
        where: {
          ...query.where,

          deletedAt: null,
        },
      }),
    ]);

    return new SearchPage({
      items: companies.map((company) => CompanyMapper.toDomain(company)),

      criteria,

      totalItems,
    });
  }

  async findByTaxId(taxId: string | null): Promise<Company | null> {
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

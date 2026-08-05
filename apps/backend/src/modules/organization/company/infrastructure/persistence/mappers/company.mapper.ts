import {
  Company as PrismaCompany,
  CompanyStatus as PrismaCompanyStatus,
  Prisma,
} from '@prisma/client';

import { Company } from '../../../domain/entities/company.entity';
import { CompanyStatus } from '../../../domain/enums/company-status.enum';

export class CompanyMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(prismaCompany: PrismaCompany): Company {
    return new Company({
      id: prismaCompany.id,
      name: prismaCompany.name,
      legalName: prismaCompany.legalName,
      taxId: prismaCompany.taxId,
      email: prismaCompany.email,
      phone: prismaCompany.phone,
      currencyCode: prismaCompany.currencyCode,
      timezone: prismaCompany.timezone,
      status: this.toDomainStatus(prismaCompany.status),
      createdAt: prismaCompany.createdAt,
      updatedAt: prismaCompany.updatedAt,
      deletedAt: prismaCompany.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(company: Company): Prisma.CompanyCreateInput {
    return {
      name: company.name,
      legalName: company.legalName,
      taxId: company.taxId,
      email: company.email,
      phone: company.phone,
      currencyCode: company.currencyCode,
      timezone: company.timezone,
      status: this.toPrismaStatus(company.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(company: Company): Prisma.CompanyUpdateInput {
    return {
      name: company.name,
      legalName: company.legalName,
      taxId: company.taxId,
      email: company.email,
      phone: company.phone,
      currencyCode: company.currencyCode,
      timezone: company.timezone,
      status: this.toPrismaStatus(company.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(status: PrismaCompanyStatus): CompanyStatus {
    switch (status) {
      case PrismaCompanyStatus.TRIAL:
        return CompanyStatus.TRIAL;

      case PrismaCompanyStatus.ACTIVE:
        return CompanyStatus.ACTIVE;

      case PrismaCompanyStatus.SUSPENDED:
        return CompanyStatus.SUSPENDED;

      case PrismaCompanyStatus.INACTIVE:
        return CompanyStatus.INACTIVE;

      default:
        throw new Error(`Unknown company status: ${status}`);
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(status: CompanyStatus): PrismaCompanyStatus {
    switch (status) {
      case CompanyStatus.TRIAL:
        return PrismaCompanyStatus.TRIAL;

      case CompanyStatus.ACTIVE:
        return PrismaCompanyStatus.ACTIVE;

      case CompanyStatus.SUSPENDED:
        return PrismaCompanyStatus.SUSPENDED;

      case CompanyStatus.INACTIVE:
        return PrismaCompanyStatus.INACTIVE;

      default:
        throw new Error(`Unknown company status: ${status}`);
    }
  }
}

import {
  Brand as PrismaBrand,
  BrandStatus as PrismaBrandStatus,
  Prisma,
} from '@prisma/client';

import { BrandEntity } from '../../../domain/entities/brand.entity';
import { BrandStatus } from '../../../domain/enums/brand-status.enum';

export class BrandMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(
    prismaBrand: PrismaBrand,
  ): BrandEntity {
    return new BrandEntity({
      id: prismaBrand.id,
      companyId: prismaBrand.companyId,
      code: prismaBrand.code,
      name: prismaBrand.name,
      description: prismaBrand.description,
      status: this.toDomainStatus(prismaBrand.status),
      createdAt: prismaBrand.createdAt,
      updatedAt: prismaBrand.updatedAt,
      deletedAt: prismaBrand.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(
    brand: BrandEntity,
  ): Prisma.BrandCreateInput {
    return {
      company: {
        connect: {
          id: brand.companyId,
        },
      },
      code: brand.code,
      name: brand.name,
      description: brand.description,
      status: this.toPrismaStatus(brand.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(
    brand: BrandEntity,
  ): Prisma.BrandUpdateInput {
    return {
      code: brand.code,
      name: brand.name,
      description: brand.description,
      status: this.toPrismaStatus(brand.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(
    status: PrismaBrandStatus,
  ): BrandStatus {
    switch (status) {
      case PrismaBrandStatus.ACTIVE:
        return BrandStatus.ACTIVE;

      case PrismaBrandStatus.INACTIVE:
        return BrandStatus.INACTIVE;

      default:
        throw new Error(
          `Unknown brand status: ${status}`,
        );
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(
    status: BrandStatus,
  ): PrismaBrandStatus {
    switch (status) {
      case BrandStatus.ACTIVE:
        return PrismaBrandStatus.ACTIVE;

      case BrandStatus.INACTIVE:
        return PrismaBrandStatus.INACTIVE;

      default:
        throw new Error(
          `Unknown brand status: ${status}`,
        );
    }
  }
}
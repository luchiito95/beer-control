import {
  Category as PrismaCategory,
  CategoryStatus as PrismaCategoryStatus,
  Prisma,
} from '@prisma/client';

import { CategoryEntity } from '../../../domain/entities/category.entity';
import { CategoryStatus } from '../../../domain/enums/category-status.enum';

export class CategoryMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(prismaCategory: PrismaCategory): CategoryEntity {
    return new CategoryEntity({
      id: prismaCategory.id,
      companyId: prismaCategory.companyId,
      code: prismaCategory.code,
      name: prismaCategory.name,
      description: prismaCategory.description,
      status: this.toDomainStatus(prismaCategory.status),
      createdAt: prismaCategory.createdAt,
      updatedAt: prismaCategory.updatedAt,
      deletedAt: prismaCategory.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(category: CategoryEntity): Prisma.CategoryCreateInput {
    return {
      company: {
        connect: {
          id: category.companyId,
        },
      },
      code: category.code,
      name: category.name,
      description: category.description,
      status: this.toPrismaStatus(category.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(category: CategoryEntity): Prisma.CategoryUpdateInput {
    return {
      code: category.code,
      name: category.name,
      description: category.description,
      status: this.toPrismaStatus(category.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(status: PrismaCategoryStatus): CategoryStatus {
    switch (status) {
      case PrismaCategoryStatus.ACTIVE:
        return CategoryStatus.ACTIVE;

      case PrismaCategoryStatus.INACTIVE:
        return CategoryStatus.INACTIVE;

      default:
        throw new Error(`Unknown category status: ${status}`);
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(status: CategoryStatus): PrismaCategoryStatus {
    switch (status) {
      case CategoryStatus.ACTIVE:
        return PrismaCategoryStatus.ACTIVE;

      case CategoryStatus.INACTIVE:
        return PrismaCategoryStatus.INACTIVE;

      default:
        throw new Error(`Unknown category status: ${status}`);
    }
  }
}

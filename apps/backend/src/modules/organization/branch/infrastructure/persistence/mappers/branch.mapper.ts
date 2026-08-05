import {
  Branch as PrismaBranch,
  BranchStatus as PrismaBranchStatus,
  Prisma,
} from '@prisma/client';

import { BranchEntity } from '../../../domain/entities/branch.entity';
import { BranchStatus } from '../../../domain/enums/branch-status.enum';

export class BranchMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(prismaBranch: PrismaBranch): BranchEntity {
    return new BranchEntity({
      id: prismaBranch.id,
      companyId: prismaBranch.companyId,
      code: prismaBranch.code,
      name: prismaBranch.name,
      email: prismaBranch.email,
      phone: prismaBranch.phone,
      address: prismaBranch.address,
      city: prismaBranch.city,
      state: prismaBranch.state,
      country: prismaBranch.country,
      postalCode: prismaBranch.postalCode,
      timezone: prismaBranch.timezone,
      status: this.toDomainStatus(prismaBranch.status),
      createdAt: prismaBranch.createdAt,
      updatedAt: prismaBranch.updatedAt,
      deletedAt: prismaBranch.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(branch: BranchEntity): Prisma.BranchCreateInput {
    return {
      company: {
        connect: {
          id: branch.companyId,
        },
      },
      code: branch.code,
      name: branch.name,
      email: branch.email,
      phone: branch.phone,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      country: branch.country,
      postalCode: branch.postalCode,
      timezone: branch.timezone,
      status: this.toPrismaStatus(branch.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(branch: BranchEntity): Prisma.BranchUpdateInput {
    return {
      code: branch.code,
      name: branch.name,
      email: branch.email,
      phone: branch.phone,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      country: branch.country,
      postalCode: branch.postalCode,
      timezone: branch.timezone,
      status: this.toPrismaStatus(branch.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(status: PrismaBranchStatus): BranchStatus {
    switch (status) {
      case PrismaBranchStatus.ACTIVE:
        return BranchStatus.ACTIVE;

      case PrismaBranchStatus.INACTIVE:
        return BranchStatus.INACTIVE;

      default:
        throw new Error(`Unknown branch status: ${status}`);
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(status: BranchStatus): PrismaBranchStatus {
    switch (status) {
      case BranchStatus.ACTIVE:
        return PrismaBranchStatus.ACTIVE;

      case BranchStatus.INACTIVE:
        return PrismaBranchStatus.INACTIVE;

      default:
        throw new Error(`Unknown branch status: ${status}`);
    }
  }
}

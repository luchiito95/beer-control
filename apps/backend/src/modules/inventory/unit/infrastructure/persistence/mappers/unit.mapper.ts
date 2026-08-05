import {
  Prisma,
  Unit as PrismaUnit,
  UnitStatus as PrismaUnitStatus,
} from '@prisma/client';

import { UnitEntity } from '../../../domain/entities/unit.entity';
import { UnitStatus } from '../../../domain/enums/unit-status.enum';

export class UnitMapper {
  /**
   * Prisma -> Domain
   */
  static toDomain(prismaUnit: PrismaUnit): UnitEntity {
    return new UnitEntity({
      id: prismaUnit.id,
      companyId: prismaUnit.companyId,
      code: prismaUnit.code,
      name: prismaUnit.name,
      symbol: prismaUnit.symbol,
      description: prismaUnit.description,
      status: this.toDomainStatus(prismaUnit.status),
      createdAt: prismaUnit.createdAt,
      updatedAt: prismaUnit.updatedAt,
      deletedAt: prismaUnit.deletedAt,
    });
  }

  /**
   * Domain -> Prisma Create
   */
  static toCreate(unit: UnitEntity): Prisma.UnitCreateInput {
    return {
      company: {
        connect: {
          id: unit.companyId,
        },
      },
      code: unit.code,
      name: unit.name,
      symbol: unit.symbol,
      description: unit.description,
      status: this.toPrismaStatus(unit.status),
    };
  }

  /**
   * Domain -> Prisma Update
   */
  static toUpdate(unit: UnitEntity): Prisma.UnitUpdateInput {
    return {
      code: unit.code,
      name: unit.name,
      symbol: unit.symbol,
      description: unit.description,
      status: this.toPrismaStatus(unit.status),
    };
  }

  /**
   * Enum Prisma -> Domain
   */
  private static toDomainStatus(status: PrismaUnitStatus): UnitStatus {
    switch (status) {
      case PrismaUnitStatus.ACTIVE:
        return UnitStatus.ACTIVE;

      case PrismaUnitStatus.INACTIVE:
        return UnitStatus.INACTIVE;

      default:
        throw new Error(`Unknown unit status: ${status}`);
    }
  }

  /**
   * Enum Domain -> Prisma
   */
  private static toPrismaStatus(status: UnitStatus): PrismaUnitStatus {
    switch (status) {
      case UnitStatus.ACTIVE:
        return PrismaUnitStatus.ACTIVE;

      case UnitStatus.INACTIVE:
        return PrismaUnitStatus.INACTIVE;

      default:
        throw new Error(`Unknown unit status: ${status}`);
    }
  }
}

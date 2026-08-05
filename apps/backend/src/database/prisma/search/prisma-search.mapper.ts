import { SearchCriteria } from '../../../core/application/search/search-criteria';

import { PrismaOrderBuilder } from './prisma-order-builder';
import { PrismaWhereBuilder } from './prisma-where-builder';

export interface PrismaSearchQuery {
  where: Record<string, unknown>;

  orderBy: Record<string, unknown>[];
}

export class PrismaSearchMapper {
  static toQuery(criteria: SearchCriteria): PrismaSearchQuery {
    return {
      where: PrismaWhereBuilder.build(criteria.root),

      orderBy: PrismaOrderBuilder.build(criteria.sort),
    };
  }
}

import { Prisma } from '@prisma/client';

import { SearchCriteria } from '@core/application/search/search-criteria';

export class PrismaSearchMapper {

  static toFindManyArgs(
    criteria: SearchCriteria,
  ): Prisma.Args<any, 'findMany'> {

    return {

      skip:
        (criteria.page - 1) *
        criteria.pageSize,

      take:
        criteria.pageSize,

    };

  }

}
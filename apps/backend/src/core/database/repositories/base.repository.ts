import { SearchCriteria } from '../../application/search/search-criteria';
import { SearchPage } from '../../application/search/search-page';

import { PrismaSearchMapper } from '../../../database/prisma/search/prisma-search.mapper';

export abstract class PrismaBaseRepository {
  protected createPagination(
    page: number,
    pageSize: number,
  ): {
    skip: number;
    take: number;
  } {
    return {
      skip: (page - 1) * pageSize,

      take: pageSize,
    };
  }

  protected async executeSearch<TPrisma, TDomain>(
    delegate: {
      findMany(args: any): Promise<TPrisma[]>;

      count(args: any): Promise<number>;
    },

    criteria: SearchCriteria,

    mapToDomain: (entity: TPrisma) => TDomain,
  ): Promise<SearchPage<TDomain>> {
    const { skip, take } = this.createPagination(
      criteria.page,

      criteria.pageSize,
    );

    const {
      where,

      orderBy,
    } = PrismaSearchMapper.toQuery(criteria);

    const [items, totalItems] = await Promise.all([
      delegate.findMany({
        where,

        orderBy,

        skip,

        take,
      }),

      delegate.count({
        where,
      }),
    ]);

    return new SearchPage({
      items: items.map(mapToDomain),

      criteria,

      totalItems,
    });
  }
}

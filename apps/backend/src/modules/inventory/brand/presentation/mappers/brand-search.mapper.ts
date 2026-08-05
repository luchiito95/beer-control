import { FilterOperator } from '../../../../../core/application/search/enums/filter-operator.enum';
import { LogicalOperator } from '../../../../../core/application/search/enums/logical-operator.enum';
import { SortDirection } from '../../../../../core/application/search/enums/sort-direction.enum';

import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchFilter } from '../../../../../core/application/search/search-filter';
import { SearchFilterGroup } from '../../../../../core/application/search/search-filter-group';
import { SearchNode } from '../../../../../core/application/search/search-node';
import { SearchSort } from '../../../../../core/application/search/search-sort';

import { SearchBrandDto } from '../dto/search-brand.dto';

export class BrandSearchMapper {
  static toCriteria(dto: SearchBrandDto): SearchCriteria {
    const rootNodes: SearchNode[] = [];

    if (dto.companyId) {
      rootNodes.push(
        new SearchFilter({
          field: 'companyId',

          operator: FilterOperator.EQUALS,

          value: dto.companyId,
        }),
      );
    }

    if (dto.status) {
      rootNodes.push(
        new SearchFilter({
          field: 'status',

          operator: FilterOperator.EQUALS,

          value: dto.status,
        }),
      );
    }

    if (dto.search) {
      rootNodes.push(
        new SearchFilterGroup({
          operator: LogicalOperator.OR,

          nodes: [
            new SearchFilter({
              field: 'code',

              operator: FilterOperator.CONTAINS,

              value: dto.search,
            }),

            new SearchFilter({
              field: 'name',

              operator: FilterOperator.CONTAINS,

              value: dto.search,
            }),
          ],
        }),
      );
    }

    return new SearchCriteria({
      page: dto.page,

      pageSize: dto.pageSize,

      root: new SearchFilterGroup({
        operator: LogicalOperator.AND,

        nodes: rootNodes,
      }),

      sort: [
        new SearchSort({
          field: 'createdAt',

          direction: SortDirection.DESC,
        }),
      ],
    });
  }
}

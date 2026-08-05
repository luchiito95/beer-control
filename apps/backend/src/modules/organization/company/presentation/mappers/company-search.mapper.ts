import { FilterOperator } from '../../../../../core/application/search/enums/filter-operator.enum';
import { LogicalOperator } from '../../../../../core/application/search/enums/logical-operator.enum';
import { SortDirection } from '../../../../../core/application/search/enums/sort-direction.enum';

import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchFilter } from '../../../../../core/application/search/search-filter';
import { SearchFilterGroup } from '../../../../../core/application/search/search-filter-group';
import { SearchNode } from '../../../../../core/application/search/search-node';
import { SearchSort } from '../../../../../core/application/search/search-sort';

import { SearchCompanyDto } from '../dto/search-company.dto';

export class CompanySearchMapper {
  static toCriteria(dto: SearchCompanyDto): SearchCriteria {
    const rootNodes: SearchNode[] = [];

    if (dto.name) {
      rootNodes.push(
        new SearchFilter({
          field: 'name',

          operator: FilterOperator.CONTAINS,

          value: dto.name,
        }),
      );
    }

    if (dto.taxId) {
      rootNodes.push(
        new SearchFilter({
          field: 'taxId',

          operator: FilterOperator.CONTAINS,

          value: dto.taxId,
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
              field: 'name',

              operator: FilterOperator.CONTAINS,

              value: dto.search,
            }),

            new SearchFilter({
              field: 'legalName',

              operator: FilterOperator.CONTAINS,

              value: dto.search,
            }),

            new SearchFilter({
              field: 'taxId',

              operator: FilterOperator.CONTAINS,

              value: dto.search,
            }),

            new SearchFilter({
              field: 'email',

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
          field: dto.sortBy ?? 'name',

          direction:
            dto.sortDirection === 'desc'
              ? SortDirection.DESC
              : SortDirection.ASC,
        }),
      ],
    });
  }
}

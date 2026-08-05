import { FilterOperator } from '../../../../../core/application/search/enums/filter-operator.enum';
import { LogicalOperator } from '../../../../../core/application/search/enums/logical-operator.enum';
import { SortDirection } from '../../../../../core/application/search/enums/sort-direction.enum';

import { SearchCriteria } from '../../../../../core/application/search/search-criteria';
import { SearchFilter } from '../../../../../core/application/search/search-filter';
import { SearchFilterGroup } from '../../../../../core/application/search/search-filter-group';
import { SearchNode } from '../../../../../core/application/search/search-node';
import { SearchSort } from '../../../../../core/application/search/search-sort';

import { SearchProductDto } from '../dto/search-product.dto';

export class ProductSearchMapper {
  static toCriteria(dto: SearchProductDto): SearchCriteria {
    return new SearchCriteria({
      page: dto.page,

      pageSize: dto.pageSize,

      root: new SearchFilterGroup({
        operator: LogicalOperator.AND,

        nodes: this.buildFilters(dto),
      }),

      sort: this.buildSort(dto),
    });
  }

  private static buildFilters(dto: SearchProductDto): SearchNode[] {
    const filters: SearchNode[] = [];

    const equalsFilters = [
      {
        field: 'companyId',
        value: dto.companyId,
      },

      {
        field: 'categoryId',
        value: dto.categoryId,
      },

      {
        field: 'brandId',
        value: dto.brandId,
      },

      {
        field: 'unitId',
        value: dto.unitId,
      },

      {
        field: 'status',
        value: dto.status,
      },
    ];

    equalsFilters
      .filter((filter) => filter.value !== undefined)
      .forEach((filter) => {
        filters.push(
          new SearchFilter({
            field: filter.field,

            operator: FilterOperator.EQUALS,

            value: filter.value!,
          }),
        );
      });

    if (dto.search) {
      filters.push(this.buildSearchGroup(dto.search));
    }

    return filters;
  }

  private static buildSearchGroup(search: string): SearchFilterGroup {
    return new SearchFilterGroup({
      operator: LogicalOperator.OR,

      nodes: [
        new SearchFilter({
          field: 'name',

          operator: FilterOperator.CONTAINS,

          value: search,
        }),

        new SearchFilter({
          field: 'code',

          operator: FilterOperator.CONTAINS,

          value: search,
        }),

        new SearchFilter({
          field: 'sku',

          operator: FilterOperator.CONTAINS,

          value: search,
        }),

        new SearchFilter({
          field: 'barcode',

          operator: FilterOperator.CONTAINS,

          value: search,
        }),
      ],
    });
  }

  private static buildSort(dto: SearchProductDto): SearchSort[] {
    return [
      new SearchSort({
        field: dto.sortBy ?? 'name',

        direction:
          dto.sortDirection === 'desc' ? SortDirection.DESC : SortDirection.ASC,
      }),
    ];
  }
}

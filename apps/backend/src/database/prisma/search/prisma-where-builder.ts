import { FilterOperator } from '../../../core/application/search/enums/filter-operator.enum';

import { SearchFilter } from '../../../core/application/search/search-filter';
import { SearchFilterGroup } from '../../../core/application/search/search-filter-group';

export class PrismaWhereBuilder {
  /**
   * Convierte el árbol de búsqueda
   * en un objeto WHERE de Prisma.
   */
  static build(root: SearchFilterGroup): Record<string, unknown> {
    return this.buildGroup(root);
  }

  /**
   * Procesa un grupo (AND / OR)
   */
  private static buildGroup(group: SearchFilterGroup): Record<string, unknown> {
    const nodes = group.nodes.map((node) => {
      if (node instanceof SearchFilter) {
        return this.buildFilter(node);
      }

      return this.buildGroup(node as SearchFilterGroup);
    });

    return {
      [group.operator]: nodes,
    };
  }

  /**
   * Procesa un filtro simple.
   */
  private static buildFilter(filter: SearchFilter): Record<string, unknown> {
    switch (filter.operator) {
      case FilterOperator.EQUALS:
        return {
          [filter.field]: {
            equals: filter.value,
          },
        };

      case FilterOperator.NOT_EQUALS:
        return {
          [filter.field]: {
            not: filter.value,
          },
        };

      case FilterOperator.CONTAINS:
        return {
          [filter.field]: {
            contains: filter.value,

            mode: 'insensitive',
          },
        };

      case FilterOperator.STARTS_WITH:
        return {
          [filter.field]: {
            startsWith: filter.value,

            mode: 'insensitive',
          },
        };

      case FilterOperator.ENDS_WITH:
        return {
          [filter.field]: {
            endsWith: filter.value,

            mode: 'insensitive',
          },
        };

      case FilterOperator.GREATER_THAN:
        return {
          [filter.field]: {
            gt: filter.value,
          },
        };

      case FilterOperator.GREATER_THAN_OR_EQUAL:
        return {
          [filter.field]: {
            gte: filter.value,
          },
        };

      case FilterOperator.LESS_THAN:
        return {
          [filter.field]: {
            lt: filter.value,
          },
        };

      case FilterOperator.LESS_THAN_OR_EQUAL:
        return {
          [filter.field]: {
            lte: filter.value,
          },
        };

      case FilterOperator.IN:
        return {
          [filter.field]: {
            in: filter.value,
          },
        };

      case FilterOperator.IS_NULL:
        return {
          [filter.field]: null,
        };

      case FilterOperator.IS_NOT_NULL:
        return {
          [filter.field]: {
            not: null,
          },
        };

      default:
        throw new Error(`Unsupported filter operator '${filter.operator}'.`);
    }
  }
}

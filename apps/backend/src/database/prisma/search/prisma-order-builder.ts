import { SearchSort } from '../../../core/application/search/search-sort';

export class PrismaOrderBuilder {
  /**
   * Convierte SearchSort[]
   * al formato esperado por Prisma.
   */
  static build(sorts: SearchSort[]): Record<string, unknown>[] {
    if (!sorts.length) {
      return [];
    }

    return sorts.map((sort) => ({
      [sort.field]: sort.direction,
    }));
  }
}

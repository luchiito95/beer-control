import { SearchCriteria } from '../../application/search/search-criteria';
import { SearchPage } from '../../application/search/search-page';

export abstract class HistoryRepository<TEntity> {

  abstract create(
    entity: TEntity,
  ): Promise<TEntity>;

  abstract findById(
    id: string,
  ): Promise<TEntity | null>;

  abstract search(
    criteria: SearchCriteria,
  ): Promise<SearchPage<TEntity>>;

}